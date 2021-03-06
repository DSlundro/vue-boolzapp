const app = new Vue({
    el: '#app',
    data: {
        activeContact: 0,
        newMessageContainer: '',
        search: '',
        dropdown: {
            activeMessage: false,
            status: false,
        },
        contacts: [{
                name: 'Michele',
                avatar: '_1',
                visible: true,
                messages: [{
                        date: '10/01/2020 15:30:55',
                        message: 'Hai portato a spasso il cane?',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        message: 'Ricordati di stendere i panni',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 16:15:22',
                        message: 'Tutto fatto!',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Fabio',
                avatar: '_2',
                visible: true,
                messages: [{
                        date: '20/03/2020 16:30:00',
                        message: 'Ciao come stai?',
                        status: 'sent'
                    },
                    {
                        date: '20/03/2020 16:30:55',
                        message: 'Bene grazie! Stasera ci vediamo?',
                        status: 'received'
                    },
                    {
                        date: '20/03/2020 16:35:00',
                        message: 'Mi piacerebbe ma devo andare a fare la spesa.',
                        status: 'sent'
                    }
                ],
            },
            {
                name: 'Samuele',
                avatar: '_3',
                visible: true,
                messages: [{
                        date: '28/03/2020 10:10:40',
                        message: 'La Marianna va in campagna',
                        status: 'received'
                    },
                    {
                        date: '28/03/2020 10:20:10',
                        message: 'Sicuro di non aver sbagliato chat?',
                        status: 'sent'
                    },
                    {
                        date: '28/03/2020 16:15:22',
                        message: 'Ah scusa!',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Alessandro B.',
                avatar: '_4',
                visible: true,
                messages: [{
                        date: '10/01/2020 15:30:55',
                        message: 'Lo sai che ha aperto una nuova pizzeria?',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        message: 'Si, ma preferirei andare al cinema',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Alessandro L.',
                avatar: '_5',
                visible: true,
                messages: [{
                        date: '10/01/2020 15:30:55',
                        message: 'Ricordati di chiamare la nonna',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        message: 'Va bene, stasera la sento',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Claudia',
                avatar: '_6',
                visible: true,
                messages: [{
                        date: '10/01/2020 15:30:55',
                        message: 'Ciao Claudia, hai novit???',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        message: 'Non ancora',
                        status: 'received'
                    },
                    {
                        date: '10/01/2020 15:51:00',
                        message: 'Nessuna nuova, buona nuova',
                        status: 'sent'
                    }
                ],
            },
            {
                name: 'Federico',
                avatar: '_7',
                visible: true,
                messages: [{
                        date: '10/01/2020 15:30:55',
                        message: 'Fai gli auguri a Martina che ?? il suo compleanno!',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        message: 'Grazie per avermelo ricordato, le scrivo subito!',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Davide',
                avatar: '_8',
                visible: true,
                messages: [{
                        date: '10/01/2020 15:30:55',
                        message: 'Ciao, andiamo a mangiare la pizza stasera?',
                        status: 'received'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        message: 'No, l\'ho gi?? mangiata ieri, ordiniamo sushi!',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:51:00',
                        message: 'OK!!',
                        status: 'received'
                    }
                ],
            }
        ],
    },

    methods: {
        selectContact(index) {
            this.activeContact = index
        },

        sendMessage(index) {
            let newMessage = {
                date: this.getDateTime(),
                message: this.newMessageContainer.trim(),
                status: 'sent'
            };
            // condizione per avere il messaggio di risposta solo se l'input inviato contiene dei caratteri
            if (newMessage.message.length > 0) {
                this.contacts[index].messages.push(newMessage);
                // funziona per ottendere la "risposta al messaggio" dopo un tot tempo
                setTimeout(() => {
                        // variabile con il messaggio da ilserire in automatico
                        let recievedMessage = {
                            date: this.getDateTime(),
                            message: 'Ok',
                            status: 'recieved'
                        };
                        this.contacts[index].messages.push(recievedMessage);
                    }, 1500) // faccio partire questa funzione dopo 1500 ms

                // pulisco l'input una volta inviato il messaggio
                this.newMessageContainer = '';

            };
        },
        // funzione per ottendere la data attuale
        getDateTime() {
            let now = new Date();
            let dd = String(now.getDate()).padStart(2, '0');
            let mm = String(now.getMonth() + 1).padStart(2, '0');
            let yyyy = now.getFullYear();
            let hour = now.getHours();
            let minutes = String(now.getMinutes()).padStart(2, "0");
            let seconds = String(now.getSeconds()).padStart(2, "0");

            return dd + '/' + mm + '/' + yyyy + ' ' + hour + ':' + minutes + ':' + seconds;
        },


        filterChat() {
            this.contacts.forEach(contact => {
                if (contact.name.toLowerCase().includes(this.search.toLowerCase())) {
                    contact.visible = true
                } else {
                    contact.visible = false
                }
            });
        },

        visibleDrop(index) {
            this.dropdown.activeMessage = index
            if (this.dropdown.status) {
                this.dropdown.status = false;
            } 
            else {
                this.dropdown.status = true;
            }
            //console.log(this.dropdown.activeMessage)
            //console.log(this.dropdown.status)
        },


        deleteMessage(index) {
            this.contacts[this.activeContact].messages.splice(index, 1)
        },


    }
});