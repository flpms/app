var Login = {
	initialize:function() {
		document.getElementById("Login").style.display = "block";
		document.getElementById("close").addEventListener('touchstart',this.close,false);
		for (var i = 0; i < AppMenuItens.itens.length; i++) {
			document.getElementById('content-'+AppMenuItens.itens[i].id).classList.add("bluringBack");
		}
	},
	close:function(){
		for (var i = 0; i < AppMenuItens.itens.length; i++) {
			document.getElementById('content-'+AppMenuItens.itens[i].id).classList.remove("bluringBack");
		}
		document.getElementById("Login").style.display = "none";
	},
}

var Holmes = {
	initialize: function() {
		console.info("Holmes On");
	},
	userId:'',
	actived:false,
	activeHolmes: function(e) {
		console.log(this.checked);
		if(!this.checked) {
			if (Holmes.userId !== '') {
				document.getElementById("Holmes").style.display = "block";
			} else {
				Login.initialize();
			}
		} else {
			document.getElementById("Holmes").style.display = "none";
		}
	}
};

var App = {
	initialize: function() {
		console.info("App Start");
		this.bindEvents();
	},
	bindEvents: function() {
		document.addEventListener('deviceready', this.onDeviceReady, false);
		//window.addEventListener('load', this.onDeviceReady, false);
		console.info("Device Ready");
	},
	onDeviceReady: function(evt) {
		console.info("Evt: "+evt.type);
		App.receivedEvent(evt.type);
	},
	receivedEvent: function(id) {
		console.info("Call AppMenu \n"+id);
		AppMenu.initialize();
	}
};

var AppMenu = {
	hide: true,
	itens:'',
	initialize:function() {
		this.bindEvents();
		console.info("Menu Ready");
	},
	bindEvents:function() {
		var buttonMenu = document.getElementById("btnShowMenu");
		buttonMenu.addEventListener('touchstart', this.actionMenu,false);
		buttonMenu.addEventListener('click', this.actionMenu,false);
		document.getElementById("mainNav").addEventListener('touchmove', this.actionMenu,false);
		console.info("Events Ready");
	},
	actionMenu: function(evt) {
		evt.preventDefault();
		if(AppMenu.hide) {
			document.getElementById("control").classList.add("menu-active");
			AppMenuItens.initialize();
			AppMenu.hide = false;
		} else {
			document.getElementById("control").classList.remove("menu-active");
			AppMenu.hide = true;
		}
	}
};

var AppMenuItens = {
	initialize: function (){
		this.bindEvents();
		console.info("Itens Ready");
	},
	itens:'',
	bindEvents: function () {
		this.itens = document.getElementById("mainNav").getElementsByTagName("li");
		for (var i = 0; i < this.itens.length; i++) {
			document.getElementById(this.itens[i].id).addEventListener('touchstart', this.swapItens, false);
			document.getElementById(this.itens[i].id).addEventListener('click', this.swapItens, false);
		}
		console.log("Events ready for: ["+this.itens.length+"] itens");
		return;
	},//for better perfomance, remove events
	unbind:function() {
		for (var i = 0; i < this.itens.length; i++) {
			document.getElementById(this.itens[i].id).removeEventListener('touchstart', this.swapItens, false);
		}
		console.info('Itens Removed');
	},
	swapItens: function(evt) {
		evt.preventDefault();
		for (var i = 0; i < AppMenuItens.itens.length; i++) {
			if (this.id === AppMenuItens.itens[i].id) {
				document.getElementById('content-'+this.id).style.display = "block";
				document.getElementById(this.id).classList.add("item-active");
				switch(this.id) {
					case 'search':
						Search.initialize();
						break;
				}
			} else {
				document.getElementById('content-'+AppMenuItens.itens[i].id).style.display = "none";
				document.getElementById(AppMenuItens.itens[i].id).classList.remove("item-active");
			}
		}
		return;
	}
};

var Search = {
	initialize: function() {
		this.bindEvents();
		console.log("Search On");
	},
	bindEvents: function() {
		document.getElementById("btnSearch").addEventListener("touchstart",function(e) { e.preventDefault(); this.search; }, false);
		try {
			Holmes.initialize();
			document.getElementById("activeHolmes").addEventListener("touchstart", Holmes.activeHolmes, false);
		} catch (e) {
			console.log(e);
		}
	},
	search: function() {
	    var query = "";
	    if (Holmes.actived) {
			query = document.getElementById("query").value;
	    } else {
			query = document.getElementById("query").value;
	    }
	    var params = "q="+query;
	    var xhr = new XMLHttpRequest();
	    xhr.open('get', 'http://192.168.25.4:1337', true);
	    xhr.setRequestHeader("Content-type", "application/json");
	    xhr.onload = function () {
			var response = JSON.parse(xhr.response);
			console.log(response);
	    };
		xhr.onerror = function () {
			console.log("Erro AJAX");
		};
		xhr.send(params);
	}
};

AppMenu.initialize();
//App.initialize();
