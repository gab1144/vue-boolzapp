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
      fakeMessage: null
    }
  },
  methods:{
    /**
     * Cambia la chat attiva sulla base del valore di index
     * @param {*} index Intero (indice del contatto da rendere attivo)
     */
    changeChat(index){
      this.activeChat=index;
      this.showOptions=null;
      this.showChevronOnHover=null;
      setTimeout(()=>{
        this.scrollToBottomOfChat();
      }, 0)
    },
    /**
     * Invia un nuovo messaggio contente il testo inserito in input da tastiera
     */
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
    /**
     * Restituisce la data e l'orario attuali
     * @returns Stringa (data e orario attuali formattati)
     */
    getTime(){
      const DateTime = luxon.DateTime;
      const now = DateTime.now().setLocale('it').toFormat('dd/LL/yyyy HH:mm:ss');

      return now;
    },
    /**
     * Invia una risposta automatica random da parte del contatto passato come paramentro
     * @param {*} contactToAnwer Oggetto (contatto di cui bisogna simulare la risposta)
     */
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
    /**
     * Restituisce solo l'orario del messaggio di indice index passato come parametro della chat attiva
     * @param {*} index Intero (indice del messaggio)
     * @returns orario del messaggio
     */
    formatTime(index){
      const date = this.contacts[this.activeChat].messages[index].date;
      return date.slice(11,16);
    },
    /**
     * Restituisce l'orario sulla base della stringa che viene passata come parametro
     * @param {*} string (data e orario di cui bisogna restituire solo l'orario)
     * @returns Stringa (orario estratto dalla stringa)
     */
    formatTimeString(string){
      return string.slice(11,16);
    },
    /**
     * Restituisce l'orario dell'ultimo messaggio del contatto di indice index o una stringa vuota se non ci sono messaggi
     * @param {*} index Intero (indice del contatto)
     * @returns Stringa (orario dell'ultimo messaggio o strunga vuota)
     */
    lastMessageFormatTime(index){
      if(this.contacts[index].messages.length !== 0){
        const date = this.contacts[index].messages[this.contacts[index].messages.length - 1].date;
        return date.slice(11,16);
      } else {
        return "";
      }
    },
    /**
     * Cancella il messaggio di indice index della chat attiva
     * @param {*} index Intero (indice del messaggio da eliminare)
     */
    deleteMessage(index){
      this.showOptions = null;
      if(this.contacts[this.activeChat].messages.length !== 1){
        this.contacts[this.activeChat].messages.splice(index, 1);
      } else {
        const emptyArray = [];
        this.contacts[this.activeChat].messages = emptyArray;
      }
    },
    /**
     * Restituisce una stringa che indica se l'ultimo messaggio del contatto è stato inviato o ricevuto
     * @param {*} contact Oggetto (contatto di cui bisogna verificare lo status dell'ultimo messaggio)
     * @returns Stringa (status dell'ultimo messaggio)
     */
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
    /**
     * Resetta i valori di showChevronOnHover e showOptions
     */
    mouseleaveNull(){
      this.showChevronOnHover = null;
      this.showOptions = null;
    },
    /**
     * Apre il canvas con le informazioni del messaggio e scrive tutte le informazioni relative
     * @param {*} index 
     */
    openInfo(index){
      const message = this.contacts[this.activeChat].messages[index];
      this.fakeMessage = message;
      this.messageDate = message.date;
      if(message.status === "sent"){
        this.messageStatus = "inviato";
      } else {
        this.messageStatus = "ricevuto";
      }
      this.messsageInfoVisible = true;
    },
    /**
     * Chiude il canvas con le informazioni del messaggio
     */
    closeInfo(){
      this.messsageInfoVisible = false;
    },
    /**
     * Restituisce un intero casuale tra min e max, estremi compresi
     * @param {*} min Intero (valore minimo compreso)
     * @param {*} max Intero (valore massimo compreso)
     * @returns Intero (numero random)
     */
    getRndInteger(min, max){
      return Math.floor(Math.random() * (max - min + 1) ) + min;
    },
    /**
     * Cerca la parola ricercata tra i messaggi all'interno del messaggio passato come parametro
     * @param {*} message (messaggio da controllare)
     * @returns Boolean (true se il messaggio contiene la stringa cercata, false se non la contiene)
     */
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
    /**
     * Nasconde o mostra l'input della parola da cercare tra i messggi
     */
    hideShowsearchWordInput(){
      this.searchedWordShow = !this.searchedWordShow;
      this.searchedWord = "";
    },
    /**
     * Aggiunge o rimuove il messaggio di indice index dai preferiti
     * @param {*} index Intero (indice del messaggio a aggiungere o rimuovere dai preferiti)
     */
    addRemoveFavouriteMessages(index){
      if(!this.contacts[this.activeChat].messages[index].favourite){
        this.contacts[this.activeChat].messages[index].favourite = true;
      } else {
        this.contacts[this.activeChat].messages[index].favourite = false;
      }
    },
    /**
     * Se il messaggio è uno dei preferiti mostra la stella
     * @param {*} index Intero (indice del messaggio)
     * @returns Boolean (true se è tra i preferiti, false se non lo è)
     */
    showStar(index){
      if(this.contacts[this.activeChat].messages[index].favourite){
        return true;
      } else {
        return false;
      }
    },
    /**
     * Ritrona la stringa da scrivere all'intero del bottone per aggiungere o
     * rimuovere il messaggio dai preferiti
     * @param {*} index Intero (indice del messaggio)
     * @returns Stringa (stringa da scrivere all'interno del bottone)
     */
    buttonFavoriteMessage(index){
      if(this.contacts[this.activeChat].messages[index].favourite){
        return "Rimuovi dai preferiti";
      } else {
        return "Aggiungi ai preferiti";
      }
    },
    /**
     * Scrolla alla fine della chat
     */
    scrollToBottomOfChat(){
      const element = document.getElementById("box");
        element.scrollTop = element.scrollHeight;
    },
    /**
     * Sposta il contatto a cui si è appena scritto in cima all'array e di conseguenza alla lista dei contatti
     * @param {*} activeIndex Intero (indice del contatto da spostare in cima)
     */
    moveContactToTop(activeIndex){
      const el = this.contacts[activeIndex];
      const exActive = activeIndex;
      this.contacts.unshift(el);
      this.activeChat=0;
      this.contacts.splice(exActive+1, 1);
    },
    /**
     * Sposta il contatto che ha appena risposto in cima all'array e di conseguenza alla lista dei contatti
     * @param {*} contactToAnwer Oggetto (contatto da spostare in cima)
     */
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
