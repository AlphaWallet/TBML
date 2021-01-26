// import Web3 from 'web3';
import React, { useState, useEffect } from 'react';
// import { Negotiator, Authenticator } from './TokenScript';
import LogoCard from './LogoCard';
import RoomCard from './RoomCard';
import TokenNotificationCard from './TokenNotificationCard';
import Typography from '@material-ui/core/Typography';
// import roomTypesData from './roomTypesDataMock.json';
import './App.css';

function App() {

  //
  // React use state settings
  //

  // Devcon Tickets
  let [tokens, setTokens] = useState([]);

  // Devcon non-discount offers
  let [freeTaxi, setFreeTaxi] = useState(false);

  // Room Types Data
  let [roomTypesData, setRoomTypesData] = useState([]);

  // Selected token instance to apply discount, with the discount value.
  let [discount, setDiscount] = useState({ value: undefined, tokenInstance: null });

  //
  // Negotiator
  //

  // Instantiate an instance of the Negotiator with chosen filters
  let negotiator = new Negotiator({}, {
    debug: 1,
    tokensOrigin: "https://devcontickets.herokuapp.com/outlet/",
    hideTokensIframe: true
  });

  //
  // Booking and Hotel Specific Events
  //

  // Select Ticket to apply a view change, showing the discount that can be redeemed.
  const getRoomTypesData = async () => {
    const roomTypesEndpoint = await fetch('http://bogotabackend.herokuapp.com/');
    return roomTypesEndpoint.json();
  }

  // Apply discount, user selected a ticket
  const applyDiscount = async (ticket) => {
    const response = await fetch(`./roomTypesTicketClassDataMock${ticket.ticketClass.toString()}.json`)
    const data = await response.json();
    setDiscount({ value: data.discount, tokenInstance: ticket });

    // To review steps.
    // Initial steps
    // // 5. attestation is triggered
    // const useTicketProof = await Authenticator.getAuthenticationBlob({ ticket });
    // // 6. get Challenge
    // const challenge = await Authenticator.fetchChallenge();
    // // 7. sign Challenge useTicketProof, challenge
    // const signedMsg = await Authenticator.signChallenge({ useTicketProof, challenge });
    // // 8. post signed message
    // const sentChallenge = await Authenticator.sendChallenge({ signedMsg });

    // Notes from Oleh
    // const useDevconTicket = await Authenticator.getAuthenticationBlob({ ticket });
    // webster sign useDevconTicket with metamask and send it to the smartContract
    // const signedTicket = await Authenticator.signToken(useDevconTicket);
    // for bogota example: I will add Authenticator method to sign ticket with Metamask and return result object. and you can send that object to the backend for autorization+dicounted checkout.
    // const checkout = this.backendRequestForCheckoutWithDiscount(product, signedTicket);
  }

  // User selects to make the booking
  const book = async (form) => {
    console.log('form data:', form);
    // const response = await fetch(`./roomTypesTicketClassDataMock${ticket.ticketClass}.json`)
    // const data = await response.json();
    // setDiscount({ value: data.discount, tokenInstance: ticket });
    // Book e.g. open paypal, metamask. 
  }

  //
  // React effects
  //

  useEffect(() => {
    // Get tokens with applied filter
    negotiator.negotiate(tokens => {
      setTokens(tokens);
      // apply any upfront discounts
      tokens.map(token => {
        if (token.ticketClass == 2n) {
          setFreeTaxi(true);
        }
      });
    });
    // Get mock rooms data
    getRoomTypesData().then((data) => {
      setRoomTypesData(data);
    })
  }, []);

  return (
    <div>
      <LogoCard title={"Hotel Bogota"} />
      <div style={{ position: 'absolute', top: '0px', right: '20px' }}>
        {tokens.length > 0 &&
          <TokenNotificationCard tokensNumber={tokens.length} />
        }
      </div>
      <div className="roomCardsContainer">
        {roomTypesData.map((room, index) => {
          return <RoomCard key={index} room={room} applyDiscount={applyDiscount} discount={discount} tokens={tokens} book={book} />
        })}
      </div>
      {
        freeTaxi &&
        <div>
          <div className="ethScale">
            <div id="space">
              <div className="elogo">
                <div className="trif u1"></div>
                <div className="trif u2"></div>
                <div className="trif u3"></div>
                <div className="trif u4"></div>
                <div className="ct"></div>
                <div className="trif l1"></div>
                <div className="trif l4"></div>
              </div>
            </div>
          </div>
          <Typography className="applyDiscountCopyContainer" gutterBottom variant="body2" component="p">
            Free Taxi service available as a Devcon Ticket Class 2n holder! Enjoy the event.
          </Typography>
        </div>
      }
    </div >
  );
}

export default App;
