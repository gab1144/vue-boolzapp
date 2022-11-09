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
              status: 'sent',
              favourite: false
            },
            {
              date: '10/01/2020 15:50:00',
              message: 'Ricordati di stendere i panni',
              status: 'sent',
              favourite: false
            },
            {
              date: '10/01/2020 16:15:22',
              message: 'Tutto fatto!',
              status: 'received',
              favourite: false
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
              status: 'sent',
              favourite: false
            },
            {
              date: '20/03/2020 16:30:55',
              message: 'Bene grazie! Stasera ci vediamo?',
              status: 'received',
              favourite: false
            },
            {
              date: '20/03/2020 16:35:00',
              message: 'Mi piacerebbe ma devo andare a fare la spesa.',
              status: 'sent',
              favourite: false
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
              status: 'received',
              favourite: false
            },
            {
              date: '28/03/2020 10:20:10',
              message: 'Sicuro di non aver sbagliato chat?',
              status: 'sent',
              favourite: false
            },
            {
              date: '28/03/2020 16:15:22',
              message: 'Ah scusa!',
              status: 'received',
              favourite: false
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
              status: 'sent',
              favourite: false
            },
            {
              date: '10/01/2020 15:50:00',
              message: 'Si, ma preferirei andare al cinema',
              status: 'received',
              favourite: false
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
              status: 'sent',
              favourite: false
            },
            {
              date: '10/01/2020 15:50:00',
              message: 'Va bene, stasera la sento',
              status: 'received',
              favourite: false
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
              status: 'sent',
              favourite: false
            },
            {
              date: '10/01/2020 15:50:00',
              message: 'Non ancora',
              status: 'received',
              favourite: false
            },
            {
              date: '10/01/2020 15:51:00',
              message: 'Nessuna nuova, buona nuova',
              status: 'sent',
              favourite: false
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
              status: 'sent',
              favourite: false
            },
            {
              date: '10/01/2020 15:50:00',
              message: 'Grazie per avermelo ricordato, le scrivo subito!',
              status: 'received',
              favourite: false
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
              status: 'received',
              favourite: false
            },
            {
              date: '10/01/2020 15:50:00',
              message: 'No, l\'ho già mangiata ieri, ordiniamo sushi!',
              status: 'sent',
              favourite: false
            },
            {
              date: '10/01/2020 15:51:00',
              message: 'OK!!',
              status: 'received',
              favourite: false
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
    }
  },
  methods:{
    changeChat(index){
      this.activeChat=index;
      this.showOptions=null;
      this.showChevronOnHover=null;
      setTimeout(()=>{
        this.scrollToBottomOfChat();
      }, 0)
    },
    sendNewMessage(){
      if(this.newMessageText !== ""){
      const newMessage= {
        date: this.getTime(),
        message: "",
        status: 'sent',
        favourite: false
      }
      newMessage.message = this.newMessageText;
      this.contacts[this.activeChat].messages.push(newMessage);
      this.newMessageText = "";
      setTimeout(()=>{
        this.scrollToBottomOfChat();
      }, 0)
      this.moveContactToTop(this.activeChat);
      this.botReceivedMessage(this.contacts[this.activeChat])
      }
      
    },
    getTime(){
      const DateTime = luxon.DateTime;
      const now = DateTime.now().setLocale('it').toFormat('dd/LL/yyyy HH:mm:ss');

      return now;

    },
    botReceivedMessage(contactToAnwer){
      setTimeout(()=>{
        let i=0;
        let found = false;
        while(i < this.contacts.length && found === false){
          if(this.contacts[i] === contactToAnwer){
            const newMessage= {
              date: this.getTime(),
              message: this.answers[this.getRndInteger(0, this.answers.length - 1)],
              status: 'received',
              favourite: false
            }
    
            this.contacts[i].messages.push(newMessage);
            this.moveContactToTopReceived(contactToAnwer);
            setTimeout(()=>{
              this.scrollToBottomOfChat();
            }, 0)
            found = true;
          }
          i++;
        }
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
      if(!this.contacts[this.activeChat].messages[index].favourite){
        this.contacts[this.activeChat].messages[index].favourite = true;
      } else {
        this.contacts[this.activeChat].messages[index].favourite = false;
      }
    },
    showStar(index){
      if(this.contacts[this.activeChat].messages[index].favourite){
        return true;
      } else {
        return false;
      }
    },
    buttonFavoriteMessage(index){
      if(this.contacts[this.activeChat].messages[index].favourite){
        return "Rimuovi dai preferiti";
      } else {
        return "Aggiungi ai preferiti";
      }
    },
    scrollToBottomOfChat(){
      const element = document.getElementById("box");
        element.scrollTop = element.scrollHeight;
    },
    moveContactToTop(activeIndex){
      const el = this.contacts[activeIndex];
      const exActive = activeIndex;
      this.contacts.unshift(el);
      this.activeChat=0;
      this.contacts.splice(exActive+1, 1);
    },
    moveContactToTopReceived(contactToAnwer){
      let i=0;
      let found = false;
      while(i < this.contacts.length && found === false){
        if(this.contacts[i] === contactToAnwer){
          const elementActive =this.contacts[this.activeChat];
          const el = this.contacts[i];
          this.contacts.unshift(el);
          this.contacts.splice(i+1, 1);
          let j = 0;
          let foundj = false;

          while(j < this.contacts.length && foundj === false){
            if(this.contacts[j] === elementActive){
              this.activeChat= j;
              foundj = true;
            }
            j++;
          }
          found = true;
        }
        i++;
      }
    }
  }
}).mount("#app")
