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
      showOptions: null,
      messsageInfoVisible: false,
      messageDate: "",
      messageStatus: "",
      answers: [
        "Ok!",
        "Tutto bene, grazie",
        "Ci vediamo dopo",
        "Ora non posso stare al telefono. Ti scrivo io dopo, ok?",
        "Ciao",
        "A che ora?",
        "Ho fatto la spesa",
        "Buongiorno",
      ],
      found: null,
      searchedWord: "",
      searchedWordShow: false,
      favouriteMessages: []
    }
  },
  methods:{
    changeChat(index){
      this.activeChat=index;
      this.showOptions=null;
      this.showChevronOnHover=null;
    },
    sendNewMessage(){
      if(this.newMessageText !== ""){
      const newMessage= {
        date: this.getTime(),
        message: "",
        status: 'sent'
      }
      newMessage.message = this.newMessageText;
      this.contacts[this.activeChat].messages.push(newMessage);
      this.newMessageText = "";
      setTimeout(()=>{
        this.scrollToBottomOfChat();
      }, 1)
      this.botRecivedMessage();
      }
    },
    getTime(){
      const DateTime = luxon.DateTime;
      const now = DateTime.now().setLocale('it').toFormat('dd/LL/yyyy hh:mm:ss');

      return now;

    },
    botRecivedMessage(){
      setTimeout(()=>{
        const newMessage= {
          date: this.getTime(),
          message: this.answers[this.getRndInteger(0, this.answers.length - 1)],
          status: 'received'
        }

        this.contacts[this.activeChat].messages.push(newMessage);
        setTimeout(()=>{
          this.scrollToBottomOfChat();
        }, 1)
      },1000)
    },
    formatTime(index){
      const date = this.contacts[this.activeChat].messages[index].date;
      return date.slice(11,16);;
    },
    lastMessageFormatTime(index){
      if(this.contacts[index].messages.length !== 0){
        const date = this.contacts[index].messages[this.contacts[index].messages.length - 1].date;
        return date.slice(11,16);
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
    },
    openInfo(index){
      const message = this.contacts[this.activeChat].messages[index];
      this.messageDate = message.date;
      if(message.status === "sent"){
        this.messageStatus = "inviato";
      } else {
        this.messageStatus = "ricevuto";
      }
      this.messsageInfoVisible = true;
    },
    closeInfo(){
      this.messsageInfoVisible = false;
    },
    getRndInteger(min, max){
      return Math.floor(Math.random() * (max - min + 1) ) + min;
    },
    searchWordInMessage(message){
      if(this.searchedWord.trim().toLowerCase() !== ""){
        if(message.message.trim().toLowerCase().includes(this.searchedWord.trim().toLowerCase())){
          return true;
        } else {
          return false;
        }
      }else{
        return false;
      }
    },
    hideShowsearchWordInput(){
      this.searchedWordShow = !this.searchedWordShow;
      this.searchedWord = "";
    },
    addRemoveFavouriteMessages(index){
      let found = -1;
      for(let i=0; i<this.favouriteMessages.length; i++){
        if(this.favouriteMessages[i].chatId === this.activeChat){
          if(this.favouriteMessages[i].messageId === index){
            found = i;
          }
        }
      }
      if(found !== -1){
        this.favouriteMessages.splice(found, 1);
      } else {
        const favouriteId = {
          chatId: this.activeChat,
          messageId: index
        }
        this.favouriteMessages.push(favouriteId);
      }
      
    },
    showStar(index){
      for(let i=0; i<this.favouriteMessages.length; i++){
        if(this.favouriteMessages[i].chatId === this.activeChat){
          if(this.favouriteMessages[i].messageId === index){
            return true;
          }
        }
      }
      return false;
    },
    buttonFavoriteMessage(index){
      let msg = "Aggiungi ai preferiti";
      for(let i=0; i<this.favouriteMessages.length; i++){
        if(this.favouriteMessages[i].chatId === this.activeChat){
          if(this.favouriteMessages[i].messageId === index){
            msg= "Rimuovi dai preferiti";
          }
        }
      }
      return msg;
    },
    scrollToBottomOfChat(){
      const element = document.getElementById("box");
        element.scrollTop = element.scrollHeight;
    }
  }
}).mount("#app")
