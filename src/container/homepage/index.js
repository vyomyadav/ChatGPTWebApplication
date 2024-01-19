import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import SideMenu from "../../components/SideMenu";
import OpenApi from "openai";
import axios from "axios";
import Modal from "react-modal";
import CustomDropdown from "../../components/Dropdown";


const HomePage = () => {
  const openai = new OpenApi({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true
  });
  const [menu, changeMenu] = useState(0);
  const [isLoading, setIsLoading] = useState(false)
  const [isResumeLoading, setIsResumeLoading] = useState(false)
  const [gptResponse, updateGptResponse] = useState("")
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [isTextAreaHidden, updateTextAreaHiddenStatus] = useState(true);
  const [clientList, updateClientList] = useState([]);
  const [selectedClient, updateSelectedClient] = useState("");
  const [summaryText, updateSummaryText] = useState("");

  const getChatResponse = async (message) => {
    setIsLoading(true);
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: message }],
    });
    updateGptResponse(completion.choices[0].message.content);
    setIsLoading(false)
    updateTextAreaHiddenStatus(false);
  }

  const insertQuestions = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/createQuestionsBatch`, // Replace with your API endpoint
        {
          // Add any data you want to send in the request body
        }
      );
      // Handle the response, you might want to customize this based on your API response structure
      setModalContent(response.data.message); // Assuming your API returns a message
      setModalIsOpen(true);
    } catch (error) {
      console.error("Error inserting questions:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const getClientList = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/getUniqueGptIndex`, // Replace with your API endpoint
        {
          // Add any data you want to send in the request body
        }
      );
      // Handle the response, you might want to customize this based on your API response structure
      const data = response.data.map(item => item.key_metadata);
      updateClientList(data)
    } catch (error) {
      console.error("Error inserting questions:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const getSummary = async () => {
    try {
      setIsResumeLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/getSummaryInvite?data=${selectedClient.value}`, // Replace with your API endpoint
        {
          // Add any data you want to send in the request body
        }
      );
      // Handle the response, you might want to customize this based on your API response structure
      const data = JSON.stringify(response.data).replace(/"/g, "");
      updateSummaryText(data);
    } catch (error) {
      console.error("Error inserting questions:", error.message);
    } finally {
      setIsResumeLoading(false);
    }
  }

  useEffect(() => {
    if (menu != 1) {
      updateGptResponse("")
    }
    if (menu == 4) {
      getClientList();
    }
    if (menu != 4) {
      updateTextAreaHiddenStatus(true);
      updateSummaryText("");
    }
  }, [menu])

  useEffect(() => {
    if(selectedClient.value && selectedClient.value !== "") {
      updateTextAreaHiddenStatus(false)
      getSummary();
    }
  }, [selectedClient])

  return (
    <>
      <div>
        <Navbar />
        <SideMenu changeMenu={changeMenu} />
        <div>
          {menu === 0 && (
            <div className="app-content">
              <div className="side-app">
                {/* <!--Page header--> */}
                <div className="page-header">
                  <div className="page-leftheader">
                    <h4 className="page-title">Generate Content</h4>
                    <ol className="breadcrumb pl-0">
                      <li className="breadcrumb-item active">Generate Content</li>
                    </ol>
                  </div>
                </div>
                {/* <!--End Page header--> */}

                {/* <!--Row--> */}
                <div className="row display-flex justify-content-center">
                  <div className="col-lg-6 col-md-12">

                    {/* {{-- Tab 1 --}} */}
                    <div className="card">
                      <div className="card-header flex justify-content-center" onClick={() => changeMenu(2)}>
                        <h3 className="card-title">Generate CV</h3>
                      </div>
                    </div>

                    {/* {{-- Tab 2 --}} */}
                    <div className="card">
                      <div className="card-header flex justify-content-center" onClick={() => changeMenu(2)}>
                        <h3 className="card-title">Generate Contract</h3>
                      </div>
                    </div>

                    {/* {{-- Tab 3 --}} */}
                    <div className="card">
                      <div className="card-header flex justify-content-center" onClick={() => changeMenu(2)}>
                        <h3 className="card-title">Generate Synthesis</h3>
                      </div>
                    </div>

                    {/* {{-- Tab 4 --}} */}
                    <div className="card">
                      <div className="card-header flex justify-content-center" onClick={() => changeMenu(2)}>
                        <h3 className="card-title">Generate Email</h3>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <!--End row--> */}
              </div>
            </div>
          )}
          {menu === 1 && (
            <div className="app-content">
              <div className="side-app">
                {/* <!--Page header--> */}
                <div className="page-header">
                  <div className="page-leftheader">
                    <h4 className="page-title">Chat</h4>
                    <ol className="breadcrumb pl-0">
                      <li className="breadcrumb-item active">Chat</li>
                    </ol>
                  </div>
                </div>
                {/* <!--End Page header--> */}

                <div className="row display-flex justify-content-center">
                  <div className="col-lg-8 col-md-12">
                    <div>
                      <div>
                        <div className="flex justify-content-center">
                          <input type="text" className="search-text" id="search-text" placeholder="Ask me?" />
                          <input type="button" className="search-btn btn-info" onClick={() => { getChatResponse(document.getElementById("search-text").value) }} value="Send" />
                        </div>
                      </div>
                      <div className="flex justify-content-center">
                        {isLoading && (
                          <div className="loader-overlay">
                            <div className="loader"></div>
                          </div>
                        )}
                        <textarea id="chatText" name="chatText" className="textarea-text" disabled value={gptResponse} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {menu === 2 && (
            <div className="app-content">
              <div className="side-app">
                {/* <!--Page header--> */}
                <div className="page-header">
                  <div className="page-leftheader">
                    <h4 className="page-title">Generate Content</h4>
                    <ol className="breadcrumb pl-0">
                      <li className="breadcrumb-item" onClick={() => changeMenu(0)}>Generate Content</li>
                      <li className="breadcrumb-item active" aria-current="page">Generate CV</li>
                    </ol>
                  </div>
                </div>
                {/* <!--End Page header--> */}

                <div className="row display-flex justify-content-center">
                  <div className="col-lg-8 col-md-12">
                    <div>
                      <div className="flex justify-content-center">
                        <textarea id="chatText" name="chatText" className="textarea-text" />
                      </div>
                      <div>
                        <div className="flex justify-content-center">
                          <input type="button" className="textarea-btn btn-info" value="Edit" />
                          <input type="button" className="textarea-btn btn-info" value="Download" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {menu === 3 && (
            <div className="app-content">
              <div className="side-app">
                {/* <!--Page header--> */}
                <div className="page-header">
                  <div className="page-leftheader">
                    <h4 className="page-title">Invités</h4>
                    <ol className="breadcrumb pl-0">
                      <li className="breadcrumb-item active">Invités</li>
                    </ol>
                  </div>
                </div>
                {/* <!--End Page header--> */}

                {/* <!--Row--> */}
                <div className="row display-flex justify-content-center">
                  <div className="col-lg-6 col-md-12">

                    {/* {{-- Tab 1 --}} */}
                    <div className="card">
                      <div className="card-header flex justify-content-center" onClick={() => insertQuestions()}>
                        {isLoading && (
                          <div className="loader-overlay">
                            <div className="loader"></div>
                          </div>
                        )}
                        <h3 className="card-title">Quelle sont les invités</h3>
                      </div>
                    </div>
                    <Modal
                      isOpen={modalIsOpen}
                      onRequestClose={() => setModalIsOpen(false)}
                      contentLabel="Example Modal"
                    >
                      <p>{modalContent}</p>
                      <button className="btn-info" onClick={() => setModalIsOpen(false)}>Close</button>
                    </Modal>

                  </div>
                </div>
              </div>
            </div>
          )}
          {menu === 4 && (
            <div className="app-content">
              <div className="side-app">
                {/* <!--Page header--> */}
                <div className="page-header">
                  <div className="page-leftheader">
                    <h4 className="page-title">Résumer</h4>
                    <ol className="breadcrumb pl-0">
                      <li className="breadcrumb-item active">Résumer</li>
                    </ol>
                  </div>
                </div>
                {/* <!--End Page header--> */}
                <div className="row display-flex justify-content-center">
                  <div className="col-lg-8 col-md-12">
                    {isLoading && (
                      <div className="loader-overlay">
                        <div className="loader"></div>
                      </div>
                    )}
                    {!isLoading && (
                      <div>
                        <div className="dropdown-bar">
                          <div className="row justify-content-center">
                            <div className="col-lg-4 dropdown-title ">
                              <span>Résumer les textes pour le client : </span>
                            </div>
                            <div className="col-lg-6">
                              <CustomDropdown
                                clientList={clientList}
                                selectedClient={selectedClient}
                                updateSelectedClient={updateSelectedClient}
                              />
                            </div>
                          </div>
                        </div>
                        {!isTextAreaHidden &&
                          (<div>
                            <div className="flex justify-content-center">
                              {isResumeLoading && (
                                <div className="loader-overlay">
                                  <div className="loader"></div>
                                </div>
                              )}
                              <textarea id="chatText" name="chatText" className="textarea-text" disabled value={summaryText} />
                            </div>
                          </div>)
                        }
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default HomePage
