const { createApp } = Vue;
const dt = luxon.DateTime;

createApp({
  data() {
    return {
      activeContact: 0,
      searchName: "",

      contacts: [
        {
          name: "Michele",
          avatar: "./img/avatar_1.jpg",
          visible: true,
          messages: [
            {
              date: "10/01/2020 15:30:55",
              message: "Hai portato a spasso il cane?",
              status: "sent",
            },
            {
              date: "10/01/2020 15:50:00",
              message: "Ricordati di stendere i panni",
              status: "sent",
            },
            {
              date: "10/01/2020 16:15:22",
              message: "Tutto fatto! Hai portato a spasso il cane?",
              status: "received",
            },
          ],
        },
        {
          name: "Fabio",
          avatar: "./img/avatar_2.jpg",
          visible: true,
          messages: [
            {
              date: "20/03/2020 16:30:00",
              message: "Ciao come stai?",
              status: "sent",
            },
            {
              date: "20/03/2020 16:30:55",
              message: "Bene grazie! Stasera ci vediamo?",
              status: "received",
            },
            {
              date: "20/03/2020 16:35:00",
              message: "Mi piacerebbe ma devo andare a fare la spesa.",
              status: "sent",
            },
          ],
        },
        {
          name: "Samuele",
          avatar: "./img/avatar_3.jpg",
          visible: true,
          messages: [
            {
              date: "28/03/2020 10:10:40",
              message: "La Marianna va in campagna",
              status: "received",
            },
            {
              date: "28/03/2020 10:20:10",
              message: "Sicuro di non aver sbagliato chat?",
              status: "sent",
            },
            {
              date: "28/03/2020 16:15:22",
              message: "Ah scusa!",
              status: "received",
            },
          ],
        },
        {
          name: "Alessandro B.",
          avatar: "./img/avatar_4.jpg",
          visible: true,
          messages: [
            {
              date: "10/01/2020 15:30:55",
              message: "Lo sai che ha aperto una nuova pizzeria?",
              status: "sent",
            },
            {
              date: "10/01/2020 15:50:00",
              message: "Si, ma preferirei andare al cinema",
              status: "received",
            },
          ],
        },
        {
          name: "Alessandro L.",
          avatar: "./img/avatar_5.jpg",
          visible: true,
          messages: [
            {
              date: "10/01/2020 15:30:55",
              message: "Ricordati di chiamare la nonna",
              status: "sent",
            },
            {
              date: "10/01/2020 15:50:00",
              message: "Va bene, stasera la sento",
              status: "received",
            },
          ],
        },
        {
          name: "Claudia",
          avatar: "./img/avatar_6.jpg",
          visible: true,
          messages: [
            {
              date: "10/01/2020 15:30:55",
              message: "Ciao Claudia, hai novità?",
              status: "sent",
            },
            {
              date: "10/01/2020 15:50:00",
              message: "Non ancora",
              status: "received",
            },
            {
              date: "10/01/2020 15:51:00",
              message: "Nessuna nuova, buona nuova",
              status: "sent",
            },
          ],
        },
        {
          name: "Federico",
          avatar: "./img/avatar_7.jpg",
          visible: true,
          messages: [
            {
              date: "10/01/2020 15:30:55",
              message: "Fai gli auguri a Martina che è il suo compleanno!",
              status: "sent",
            },
            {
              date: "10/01/2020 15:50:00",
              message: "Grazie per avermelo ricordato, le scrivo subito!",
              status: "received",
            },
          ],
        },
        {
          name: "Davide",
          avatar: "./img/avatar_8.jpg",
          visible: true,
          messages: [
            {
              date: "10/01/2020 15:30:55",
              message: "Ciao, andiamo a mangiare la pizza stasera?",
              status: "received",
            },
            {
              date: "10/01/2020 15:50:00",
              message: "No, l'ho già mangiata ieri, ordiniamo sushi!",
              status: "sent",
            },
            {
              date: "10/01/2020 15:51:00",
              message: "OK!!",
              status: "received",
            },
          ],
        },
      ],

      newMessageSend: {
        date: "",
        message: "",
        status: "sent",
      },

      newMessageReceived: {
        date: "",
        message: "OK!!!",
        status: "received",
      },
    };
  },

  methods: {
    showChat(index) {
      this.activeContact = index;
    },

    addNewMessageSend() {
      if (!this.newMessageSend.message) return;
      const newMessageCopy = { ...this.newMessageSend };
      this.newMessageSend.date = this.getCurrentTime();
      this.contacts[this.activeContact].messages.push(newMessageCopy);
      this.newMessageSend.message = "";
      setTimeout(() => this.addNewMessageReceived(), 1000);
    },

    addNewMessageReceived() {
      const newReceivedCopy = { ...this.newMessageReceived };
      this.contacts[this.activeContact].messages.push(newReceivedCopy);
      this.newMessageReceived.date = this.getCurrentTime();
    },

    getCurrentTime() {
      const now = new Date();

      const day = now.getDate() < 10 ? "0" + now.getDate() : now.getDate();
      const month = now.getMonth() < 10 ? "0" + now.getMonth() : now.getMonth();
      const year =
        now.getFullYear() < 10 ? "0" + now.getFullYear() : now.getFullYear();
      const hour = now.getHours() < 10 ? "0" + now.getHours() : now.getHours();
      const minute =
        now.getMinutes() < 10 ? "0" + now.getMinutes() : now.getMinutes();
      const second =
        now.getSeconds() < 10 ? "0" + now.getSeconds() : now.getSeconds();

      return `${day}/${month}/${year} ${hour}:${minute}:${second}`;
    },

    formatDate(date) {
      const messageDate = dt.fromFormat(date, "dd/MM/yyyy HH:mm:ss");
      const messageDateText = messageDate.toLocaleString(dt.TIME_24_SIMPLE);
      return messageDateText;
    },

    filteredContacts() {
      this.contacts = this.contacts.map((contact) => {
        if (
          contact.name.toLowerCase().includes(this.searchName.toLowerCase())
        ) {
          contact.visible = true;
        } else {
          contact.visible = false;
        }
        return contact;
      });
    },

    deleteMessage(i) {
      this.contacts[this.activeContact].messages.splice(i, 1);
    },

    getLastAccess(messages) {
      const sentMessages = messages.filter(
        (message) => message.status == "sent"
      );
      const lastMessage = sentMessages[sentMessages.length - 1];
      return this.formatDate(lastMessage.date);
    },

    getLastMessage(messages) {
      const getLastMessage = messages.at(-1);
      return getLastMessage.message;
    },

    getLastMessageDate(messages) {
      const getLastMessage = messages.at(-1);
      return this.formatDate(getLastMessage.date);
    },
  },

  mounted() {},
}).mount("#app");
