const {createApp} = Vue;

createApp({
  data(){
    return {
      contacts: [
        {
          name: 'Michele',
          avatar: '_1',
          visible: true,
          messages: [
            {
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
          messages: [
            {
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
          messages: [
            {
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
          messages: [
            {
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
          messages: [
            {
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
          messages: [
            {
              date: '10/01/2020 15:30:55',
              message: 'Ciao Claudia, hai novità?',
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
          messages: [
            {
              date: '10/01/2020 15:30:55',
              message: 'Fai gli auguri a Martina che è il suo compleanno!',
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
          messages: [
            {
              date: '10/01/2020 15:30:55',
              message: 'Ciao, andiamo a mangiare la pizza stasera?',
              status: 'received'
            },
            {
              date: '10/01/2020 15:50:00',
              message: 'No, l\'ho già mangiata ieri, ordiniamo sushi!',
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
      pathImg: "img/avatar",
      activeChat: 0,
      newMessageText: "",
      searchContact: "",
      showChevronOnHover: null,
      showOptions: null
    }
  },
  methods:{
    changeChat(index){
      this.activeChat=index;
      this.showOptions=null;
      this.showChevronOnHover=null;
    },
    sendNewMessage(){
      const newMessage= {
        date: this.getTime(),
        message: this.newTaskText,
        status: 'sent'
      }
      newMessage.message = this.newMessageText;
      this.contacts[this.activeChat].messages.push(newMessage);
      this.newMessageText = "";
      this.botRecivedMessage();
    },
    getTime(){
      const data = new Date();
      let output;

      if(data.getDate() < 10) {
        output= "0" + data.getDate();
      } else {
        output= data.getDate();
      }

      output+= "/";

      if((data.getMonth()+1) < 10) {
        output= "0" + (data.getMonth()+1);
      } else {
        output += data.getMonth()+1;
      }

      output+= "/";

      if(data.getFullYear() < 10) {
        output= "0" + data.getFullYear();
      } else {
        output += data.getFullYear();
      }

      output+= " ";

      if(data.getHours() < 10) {
        output= "0" + data.getHours();
      } else {
        output += data.getHours();
      }

      output+= ":";

      if(data.getMinutes() < 10) {
        output= "0" + data.getMinutes();
      } else {
        output += data.getMinutes();
      }

      output+= ":";

      if(data.getSeconds() < 10) {
        output= "0" + data.getSeconds();
      } else {
        output += data.getSeconds();
      }
      return output;
    },
    botRecivedMessage(){
      setTimeout(()=>{
        const newMessage= {
          date: this.getTime(),
          message: "Ok!",
          status: 'received'
        }
        this.contacts[this.activeChat].messages.push(newMessage);
      },1000)
    },
    formatTime(index){
      return `${this.contacts[this.activeChat].messages[index].date.split(' ')[1].split(':')[0]}:${this.contacts[this.activeChat].messages[index].date.split(' ')[1].split(':')[1]}`;
    },
    lastMessageFormatTime(index){
      if(this.contacts[index].messages.length !== 0){
        return `${this.contacts[index].messages[this.contacts[index].messages.length - 1].date.split(' ')[1].split(':')[0]}:${this.contacts[index].messages[this.contacts[index].messages.length - 1].date.split(' ')[1].split(':')[1]}`;
        } else {
          return "";
        }
      },
    deleteMessage(index){
      this.showOptions = null;
      if(this.contacts[this.activeChat].messages.length !== 1){
        this.contacts[this.activeChat].messages.splice(index, 1);
      } else {
        const emptyArray = [];
        this.contacts[this.activeChat].messages = emptyArray;
      }
    },
    lastMessageSentReceived(contact){
      if(contact.messages.length !== 0){
        if(contact.messages[contact.messages.length - 1].status === "sent"){
          return "Ultimo messaggio inviato";
        }else{
          return "Ultimo messaggio ricevuto";
        }
      } else {
        return "";
      }
    },
    mouseleaveNull(){
      this.showChevronOnHover = null;
      this.showOptions = null;
    }
  }
}).mount("#app")