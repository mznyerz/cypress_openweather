/// <reference types="cypress"/>


const apiData = require('../../fixtures/apiData.json')
const API_BASE_URL = Cypress.env('apiBaseURL');
let AUTH_TOKEN;
let BOOKING_ID;

describe('API TESTS', () => {
    const createToken = () => {
        return cy.request({
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            url: `${API_BASE_URL}/auth`,
            body: apiData.admin,
        });
    };
    const createBooking = () => {
        return cy.request({
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            url: `${API_BASE_URL}/booking`,
            body: apiData.created,
        });
    };
    const getBooking = () => {
        return cy.request({
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            url: `${API_BASE_URL}/booking/${BOOKING_ID}`,
        });
    };
    const updateBookingPut = () => {
        return cy.request({
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Cookie": `token=${AUTH_TOKEN}`
            },
            url: `${API_BASE_URL}/booking/${BOOKING_ID}`,
            body: apiData.updateDataPut,
        });
    };
    const updateBookingPatch = () => {
        return cy.request({
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Cookie": `token=${AUTH_TOKEN}`
            },
            url: `${API_BASE_URL}/booking/${BOOKING_ID}`,
            body: apiData.updateDataPatch,
        });
    };

    describe('Auth - CreateToken', () => {

        it('Verify Create Token', () => {
            createToken().then((response) => {
                expect(response.status).to.eql(200);
                expect(response.body).to.have.property('token');
                expect(response.body).not.have.property('reason');
            });
        });

        it('TypeOf Token is String', () => {
            createToken().then((response) => {
                AUTH_TOKEN = response.body.token;
                expect(response.body.token).to.be.a('string');
            });
        });

    });

    describe('Create Booking', () => {

        it('Verify Create Booking status', () => {
            createBooking().then((response) => {
                expect(response.status).to.eql(200);
            });
        });

        it('Verify correct data response typeOf', () => {
            createBooking().then((response) => {
                let responseBody = response.body;
                Object.keys(responseBody).forEach(el => {
                    expect(responseBody[el]).to.be.a(apiData.createdCorrectDataReponseTypes[el]);
                });
                Object.keys(responseBody['booking']).forEach(bookingItem => {
                    expect(responseBody['booking'][bookingItem]).to.be.a(apiData.correctBookingItems[bookingItem]);
                });
                Object.keys(responseBody['booking']['bookingdates']).forEach(bookingdatesItem => {
                    expect(new Date(responseBody['booking']['bookingdates'][bookingdatesItem]).toString()).not.be.eql('Invalid Date');
                });

            });
        });

        it('Verify correct data  in response body properties', () => {
            createBooking().then((response) => {
                BOOKING_ID = response.body.bookingid;
                let responseBody = response.body;
                Object.keys(responseBody).forEach((el, index) => {
                    expect(el).to.be.eql(apiData.correctDataReponseProperties.obj[index]);
                });
                Object.keys(responseBody['booking']).forEach((bookingItem, indexBookingItem) => {
                    expect(bookingItem).to.be.eql(apiData.correctDataReponseProperties.booking[indexBookingItem]);
                });
                Object.keys(responseBody['booking']['bookingdates']).forEach((bookingdatesItem, indexBookingdatesItem) => {
                    expect(bookingdatesItem).to.eql(apiData.correctDataReponseProperties.bookingdates[indexBookingdatesItem]);
                });
            });
        });

        it('Verify correct date checkin/checkout', () => {
            createBooking().then(({ body }) => {
                expect(new Date(body.booking.bookingdates.checkout)).to.be.above(new Date(body.booking.bookingdates.checkin));
            });
        });
    });

    describe('GetBooking', () => {

        it('Verify GetBooking status', () => {
            getBooking().then((response) => {
                expect(response.status).to.eql(200);
            });
        });

        it('Verify GetBooking data body response', () => {
            getBooking().then(({ body }) => {
                expect(body).to.deep.eql(apiData.created);
            });
        });

        it('Verify GetBooking data headers', () => {
            getBooking().then(({ headers }) => {
                cy.log(JSON.stringify(headers));
                expect(headers).to.be.a('object');
                expect(Object.entries(headers)).to.have.length(apiData.getBookingHeaders.properties.length);
                expect(Object.keys(headers)).to.deep.eql(apiData.getBookingHeaders.properties);
                expect(headers).to.deep.include(apiData.getBookingHeaders['content-type']);
            });
        });
    });

    describe('UpdateBooking', () => {

        it('Verify UpdateBooking changes', () => {
            let beforeFirstName, beforePrice;

            getBooking().then(({ body }) => {
                beforeFirstName = body.firstname;
                beforePrice = body.totalprice;
            });
            updateBookingPut().then((response) => {
                let currentFirstName = response.body.firstname;
                let currentPrice = response.body.totalprice;

                expect(response.status).to.be.eql(200);
                expect(currentFirstName).not.be.eql(beforeFirstName);
                expect(currentPrice).not.be.eql(beforePrice);
                expect(response.body).to.deep.eql(apiData.updateDataPut);
            });
        });

        it('Verify UpdateBooking data headers', () => {
            updateBookingPut().then(({ headers }) => {
                expect(Object.entries(headers)).to.have.length(apiData.getBookingHeaders.properties.length);
                expect(Object.keys(headers)).to.deep.eql(apiData.getBookingHeaders.properties);
                expect(headers).to.deep.include(apiData.getBookingHeaders['content-type']);
            });
        });

    });

    describe('PartialUpdateBooking', () => {

        it('Verify PartialUpdateBooking changes', () => {
            let additionalneeds;

            getBooking().then(({ body }) => {
                additionalneeds = body.additionalneeds;
            });
            updateBookingPatch().then((response) => {
                expect(response.status).to.be.eql(200);
                expect(response.body.additionalneeds).not.be.eql(additionalneeds);
            });
        });

        it('Vetify PartialUpdateBooking data headers', () => {
            updateBookingPatch().then(({ headers }) => {
                expect(Object.entries(headers)).to.have.length(apiData.getBookingHeaders.properties.length);
                expect(Object.keys(headers)).to.deep.eql(apiData.getBookingHeaders.properties);
                expect(headers).to.deep.include(apiData.getBookingHeaders['content-type']);
            });
        });
    });

});