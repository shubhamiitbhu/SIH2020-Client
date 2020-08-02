import React, { useEffect, useContext, useState } from "react";
import { Icon } from "react-icons-kit";
import { question } from "react-icons-kit/icomoon/question";
import { Button, Modal, Grid, Image } from "semantic-ui-react";
import firebase from "firebase/app";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import "firebase/firestore";
import styled from "styled-components";

import EnquiryAPI from "../utils/EnquiryAPI";
import API from "../utils/API.js";
import UserContext from "../contexts/UserContext";

const EnquirySpeech = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState([]);
  const userContext = useContext(UserContext);

  const { language } = userContext;

  const { onSpeechEnd } = props;
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  var recognition = new SpeechRecognition();
  recognition.lang = language;

  const listenSpeech = () => {
    setIsOpen(true);
    recognition.start();
  };

  const stopListnening = () => {
    recognition.stop();
  };

  recognition.onresult = async (event) => {
    var last = event.results.length - 1;
    var transcript = event.results[last][0].transcript;

    const body = { text: transcript, language: language };

    const entityExtraction = await EnquiryAPI.post("/", body);
    if (entityExtraction !== undefined) {
      stopListnening();
      setData([...data, entityExtraction]);
    }

    console.log(entityExtraction);
  };

  recognition.onspeechend = () => {
    recognition.stop();
  };

  return (
    <React.Fragment>
      <ToastContainer />
      <StyledButton
        circular
        style={{ padding: 0.5 + "rem", background: "#fff" }}
        type="submit"
        onClick={() => {
          listenSpeech();
        }}
      >
        {" "}
        <Icon size={40} icon={question} />
      </StyledButton>

      <Grid.Row>
        <Grid.Column width={5} />
        <Grid.Column width={6}>
          <StyledModal
            size="mini"
            closeIcon
            open={isOpen}
            onClose={() => {
              setData([]);
              setIsOpen(false);
            }}
            onOpen={() => setIsOpen(true)}
          >
            {(() => {
              console.log(data);
              return (
                <React.Fragment>
                  <Modal.Header>
                    Our bot, is Listening to your queries
                  </Modal.Header>
                  {data.length !== 0 && (
                    <Modal.Body>
                      Task : {data[0].data.intent.name}
                      <br />
                      {data[0].data.entity[0].entity}:{" "}
                      {data[0].data.entity[0].value}
                    </Modal.Body>
                  )}
                  {data.length === 0 && (
                    <StyledImage wrapped size="large" src="./microphone.gif" />
                  )}
                </React.Fragment>
              );
            })()}
          </StyledModal>
        </Grid.Column>
        <Grid.Column width={5} />
      </Grid.Row>
    </React.Fragment>
  );
};

const StyledModal = styled(Modal)`
  margin-left: 25% !important;
  top: 30%;
  height: auto !important;
`;

const StyledImage = styled(Image)`
  margin-left: 20%;
`;

const StyledButton = styled(Button)`
  position: absolute !important;
  bottom: 2% !important;
  right: 2% !important;
`;
export default EnquirySpeech;
