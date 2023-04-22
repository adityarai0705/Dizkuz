import React, { useState, useEffect } from 'react'
import { useNavigate} from 'react-router-dom';
import OrganisationCard from '../../Components/OrganisationCard';
import testImg from './testimg.jpeg';
import './OrganisationPage.css';
import Footer from '../../Components/Footer';
import NavBar from '../../Components/NavBar';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';

let cards = [];

// const cards = [
//   {
//     logo: testImg,
//     title: "Title1",
//     id: "644060638750188c0c2881e7",
//   },
//   {
//     logo: testImg,
//     title: "Title2",
//     id: "id2",
//   },
//   {
//     logo: testImg,
//     title: "Title3",
//     id: "id3",
//   },
//   {
//     logo: testImg,
//     title: "Title4",
//     id: "id4",
//   },
//   {
//     logo: testImg,
//     title: "Title5",
//     id: "id5",
//   },
// ];

export default function OrganisationsPage(prop) {
  const navigate = useNavigate();
  let currentUser_ = {};

  const [alertHead, setAlertHead] = useState("");
  const [alertBody, setAlertBody] = useState("");
  const [alertVarient, setAlertVarient] = useState("");
  const [show, setShow] = useState(false);

  const [ HtmlLoaded, setHtmlLoaded] = useState( false);

  let CardsComponent = [];
  
  useEffect( () => {
    currentUser_ = JSON.parse(localStorage.getItem('currentUser'));
    if( currentUser_ == null){
      navigate( '/landing');
    }

    const doWork = async() => {
      let currentUser_ = JSON.parse(localStorage.getItem('currentUser'));
      const reqData = {
        email : currentUser_.email,
        password : currentUser_.password,
        organisations : currentUser_.organisations
      }

      try {
        const response = await fetch("http://localhost:8080/organisations", {
          method: "POST",
          body: JSON.stringify(reqData),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const fetchedData = await response.json();

        if (fetchedData.status === 'authFailed') {
          localStorage.removeItem( 'currentUser');
          navigate( '/landing');
        }
        else if( fetchedData.status === 'failed')
        {
          setAlertHead("Data failed to retrieve!");
          setAlertBody(
            "There was some unexpected error in retrieving the data of your organisations. Please try again."
          );
          setAlertVarient("danger");
          setShow( true);
        }else{
          console.log( "fetched");
          console.log( fetchedData);
          cards = fetchedData.data;

          CardsComponent = cards.map((card) =>{
            return(
            <div>
                <OrganisationCard logo={card.logo} title={card.name} id={card._id} key={card._id}/>
            </div>
            );
          });

          setHtmlLoaded( true);
        }
      } catch (error) {
        console.log(error);
        setAlertHead("Data failed to retrieve!");
        setAlertBody("There was some error in retrieving the data of your organisations. Please check your connection and try again.");
        setAlertVarient("danger");
        setShow( true);
      }
    }
    
    doWork();
    
  }, []);


  console.log( CardsComponent);
  return (
    HtmlLoaded?
    show?
    <>
    <NavBar />
    <div  style={{paddingTop : '50px'}}>
      <Alert variant={alertVarient} onClose={() => setShow(false)} dismissible>
        <Alert.Heading>{alertHead}</Alert.Heading>
        <p>
          {alertBody}
        </p>
      </Alert>
      <div className='OrganisationPageContainer1'>
          <h3 style={{textAlign: 'center'}}>Your Organisations</h3>
          <hr/>
          <div className='OrganisationPageContainer2'>
              {CardsComponent}
          </div>
      </div>
    </div>
    <Footer />
    </>
    :
    <>
    <NavBar />
    <div  style={{paddingTop : '100px'}}>
      
      <div className='OrganisationPageContainer1'>
          <h3 style={{textAlign: 'center'}}>Your Organisations</h3>
          <hr/>
          <div className='OrganisationPageContainer2'>
              {CardsComponent}
          </div>
      </div>
    </div>
    <Footer />
    </>
    :
    <>
      <NavBar />
      <div className='SpinnerContainer'>
        <Spinner animation="border" variant="dark" />
      </div>
      <Footer />
    </>
  );
}
