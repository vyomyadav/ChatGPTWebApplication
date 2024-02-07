import React, { useEffect, useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import Navbar from "../../components/Navbar";
import SideMenu from "../../components/SideMenu";
import OpenApi from "openai";
import axios from "axios";
import Modal from "react-modal";
import CustomDropdown from "../../components/Dropdown";
import "react-tabs/style/react-tabs.css";



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
  const [docList, updateDocList] = useState([]);
  const [selectedClient, updateSelectedClient] = useState("");
  const [selectedDoc, updateSelectedDoc] = useState("");
  const [summaryText, updateSummaryText] = useState("");
  const [isAskMeBtnDisabled, disableAskMeBtn] = useState("disabled");
  const [question, updateQuestion] = useState("");
  const [tabIndex, setTabIndex] = useState(0);

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

  const getDocList = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/getDistinctDoc`, // Replace with your API endpoint
        {
          // Add any data you want to send in the request body
        }
      );
      // Handle the response, you might want to customize this based on your API response structure
      const data = response.data.map(item => item.typ_de_doc);
      updateDocList(data)
    } catch (error) {
      console.error("Error inserting questions:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const getSummary = async () => {
    try {
      updateTextAreaHiddenStatus(false)
      setIsResumeLoading(true);
      let response = null;
      if (tabIndex == 0) {
        response = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/getSummaryInvite`, // Replace with your API endpoint
          {
            // Add any data you want to send in the request body
            key: selectedClient.value,
            question: question
          }
        );
      }
      else if (tabIndex == 1) {
        response = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/getSummaryDoc`, // Replace with your API endpoint
          {
            // Add any data you want to send in the request body
            key: selectedDoc.value,
            question: question
          }
        );
      }

      // Handle the response, you might want to customize this based on your API response structure
      const data = JSON.parse(JSON.stringify(response.data));
      updateSummaryText(data);
    } catch (error) {
      console.error("Error inserting questions:", error.message);
    } finally {
      setIsResumeLoading(false);
    }
  }

  const handleQuestionChange = () => {
    if (tabIndex == 0) {
      updateQuestion(document.getElementById("question-text").value)
    }
    else if (tabIndex == 1) {
      updateQuestion(document.getElementById("doc-text").value)
    }

  }


  useEffect(() => {
    if (menu != 1) {
      updateGptResponse("")
    }
    if (menu == 4) {
      if (tabIndex == 0) {
        getClientList();
      }
      else if (tabIndex == 1) {
        getDocList();
      }
    }
    if (menu != 4) {
      updateTextAreaHiddenStatus(true);
      updateSummaryText("");
    }
  }, [menu, tabIndex])

  useEffect(() => {
    updateTextAreaHiddenStatus(true);
    updateSummaryText("");
  },[tabIndex])

  useEffect(() => {
    if ((selectedClient.value || selectedDoc.value) && (selectedClient.value !== "" || selectedDoc.value !== "") && question !== "") {
      disableAskMeBtn(false);
    }
  }, [selectedClient, question, selectedDoc])


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
                    <h4 className="page-title">Invites</h4>
                    <ol className="breadcrumb pl-0">
                      <li className="breadcrumb-item active">Invites</li>
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
                        <h3 className="card-title">Quelle sont les invites</h3>
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
                    <h4 className="page-title">Index</h4>
                    <ol className="breadcrumb pl-0">
                      <li className="breadcrumb-item active">Index</li>
                    </ol>
                  </div>
                </div>
                {/* <!--End Page header--> */}
                <div>
                  <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
                    <TabList className="tab-list-custom">
                      <Tab>Key Metadata</Tab>
                      <Tab>Type de doc</Tab>
                    </TabList>

                    <TabPanel>
                      <div>
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
                                  <div className="row">
                                    <div className="col-lg-4 dropdown-title justify-content-center">
                                      <span className="keyMeta-text">Key Metadata: </span>
                                    </div>
                                    <div className="col-lg-7">
                                      <CustomDropdown
                                        clientList={clientList}
                                        selectedClient={selectedClient}
                                        updateSelectedClient={updateSelectedClient}
                                        placeholder={"Sélectionnez un client..."}
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className="question">
                                  <div className="row">
                                    <div className="col-lg-4 dropdown-title justify-content-center">
                                      <span className="keyMeta-text">Question: </span>
                                    </div>
                                    <div className="col-lg-7 dropdown-title">
                                      <input type="text" className="question-text" id="question-text" placeholder="Ask me?" onChange={handleQuestionChange} />
                                      <input type="button" className="question-btn btn-info" onClick={getSummary} value="Send" disabled={isAskMeBtnDisabled} />
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
                    </TabPanel>
                    <TabPanel>
                      <div>
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
                                  <div className="row">
                                    <div className="col-lg-4 dropdown-title justify-content-center">
                                      <span className="keyMeta-text">Type de doc: </span>
                                    </div>
                                    <div className="col-lg-7">
                                      <CustomDropdown
                                        clientList={docList}
                                        selectedClient={selectedDoc}
                                        updateSelectedClient={updateSelectedDoc}
                                        placeholder={"Sélectionnez un type de doc..."}
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className="question">
                                  <div className="row">
                                    <div className="col-lg-4 dropdown-title justify-content-center">
                                      <span className="keyMeta-text">Question: </span>
                                    </div>
                                    <div className="col-lg-7 dropdown-title">
                                      <input type="text" className="question-text" id="doc-text" placeholder="Ask me?" onChange={handleQuestionChange} />
                                      <input type="button" className="question-btn btn-info" onClick={getSummary} value="Send" disabled={isAskMeBtnDisabled} />
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
                    </TabPanel>
                  </Tabs>
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
