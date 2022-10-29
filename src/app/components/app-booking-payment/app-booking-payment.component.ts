import { Component, OnInit } from '@angular/core';
//import {AngularFireFunctions} from '@angular/fire/functions';

import { Hero,Nail } from '../menu/hero';
import { HEROES,PolyGel, Rubberbase } from '../menu/models';
@Component({
  selector: 'app-app-booking-payment',
  templateUrl: './app-booking-payment.component.html',
  styleUrls: ['./app-booking-payment.component.css']
})
export class AppBookingPaymentComponent implements OnInit {




constructor() {}
  ngOnInit() {
    this.invokeStripe();

   
  }






  paymentHandler: any = null;
  
  makePayment(amount: any) {
    const paymentHandler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51LvVKoBFn7mfkH25MPo8yiqOUcx1wSKIx15Xb16TkqDRmaMzoeBBRCUSPa1qjF0mzySFl6sdznRWBh52TQIBaLp800WTJBrdV8',
      locale: 'auto',
      token: function (stripeToken: any) {
        console.log(stripeToken);
        alert('Stripe token generated!---Maybe you might wanna say Payment Successful---Again why devs need designers');
      },
    });
    paymentHandler.open({
      name: 'Lavished',
      description: ' why devs need designers',
      amount: amount * 100,
      email: "kgotsozyn@gmail.com"
    });
  }
  invokeStripe() {
    if (!window.document.getElementById('stripe-script')) {
      const script = window.document.createElement('script');
      script.id = 'stripe-script';
      script.type = 'text/javascript';
      script.src = 'https://checkout.stripe.com/checkout.js';
      script.onload = () => {
        this.paymentHandler = (<any>window).StripeCheckout.configure({
          key: 'pk_test_51LvVKoBFn7mfkH25MPo8yiqOUcx1wSKIx15Xb16TkqDRmaMzoeBBRCUSPa1qjF0mzySFl6sdznRWBh52TQIBaLp800WTJBrdV8',
          locale: 'auto',
          token: function (stripeToken: any) {
            console.log(stripeToken);
            alert('Payment has been successfull!');
          },
        });
      };
      window.document.body.appendChild(script);
    }
  }


  



  /* polygel = PolyGel;
rubberbase = Rubberbase;


selectedPolygel!: Nail;
selectedRubberbase!: Nail;


currentDate: any;


paymentRequest!: google.payments.api.PaymentDataRequest; */

  /*
 onSelectP(polygel: Nail): void {
    this.selectedPolygel = polygel;
  }
  onSelectR(rubberbase: Nail): void {
    this.selectedRubberbase = rubberbase;
  }




  onLoadPaymentData(e : Event) {
   const event = e as CustomEvent<google.payments.api.PaymentData>;
    console.log("load payment data", event.detail);
  }


   this.paymentRequest = {
      apiVersion: 2,
      apiVersionMinor: 0,
      allowedPaymentMethods: [
        {
          type: 'CARD',
          parameters: {
            allowedAuthMethods: ['PAN_ONLY','CRYPTOGRAM_3DS'],
            allowedCardNetworks: ['MASTERCARD','VISA'],

          },
          tokenizationSpecification: {
            type: 'PAYMENT_GATEWAY',
            parameters: {
              gateway: 'example',
              gatewayMerchantId: 'exampleGatewayMerchantId',
            },
          },
        },
      ],
      merchantInfo: {
        merchantId: '17613812255336763067',
        merchantName: 'Demo only(you will not be charged)',
      },
      transactionInfo: {
        totalPriceStatus: 'ESTIMATED',
        totalPriceLabel: 'Total',
        totalPrice: '260.00',// this.selectedPolygel?.price.toFixed(2), //this.item.price.toFixed(2)
        currencyCode: 'ZAR',
        countryCode:'ZA'
      }
    }
 
*/


















}
