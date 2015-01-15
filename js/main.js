
var app = {
	init: function(){
		this.testForm();		
	},

	loginForm: function(){
		loginData = [
			{
				label: 'Логин',
				name: 'login',
				type: 'text',
				data: '1'
			},
			{
				label: 'Пароль',
				name: 'password',
				type: 'text',
				data: '1'
			},
			{
				type: 'submit',
				value: 'Войти',
			},			
		];
		this.buildForm();	
		this.bindEventLogin();		
	},

	testForm: function(){
		loginData = [
			{
				label: 'Вопрос 1',				
				type: 'checkbox',
				name: ['q1','q2','q3'],
				data: 'q1'
			},
			{
				label: 'Вопрос 2',				
				type: 'checkbox',
				name: ['q4','q5'],
				data: 'q4'
			},
			{
				label: 'Вопрос 3',				
				type: 'checkbox',
				name: ['q6','q7','q8','q9'],
				data: 'q6'
			},	
			{
				type: 'submit',
				value: 'Проверить результаты',
			},					
		];
		this.buildForm();	
		this.bindEventTest();
	},

	createNewElement: function(blockPlace, blockTag, blockClass, blockID, blockInnerHtml, blockAttrVal, blockAttrPar, blockValue){
		var newBlock = document.createElement(blockTag);
		if (blockClass)
			newBlock.className = blockClass;
		if (blockID)
			newBlock.id = blockID;
		if (blockInnerHtml)
			newBlock.innerHTML = blockInnerHtml;
		if (blockAttrVal && blockAttrPar)
			newBlock.setAttribute(blockAttrVal,blockAttrPar);
		if (blockValue)
			newBlock.setAttribute('value',blockValue);
		blockPlace.appendChild(newBlock);
	},	

	buildForm: function(){
		var loginForm = document.querySelector('.form');

		for (var i = 0; i < loginData.length; i++) {
			var div = document.createElement('div');			

			if(loginData[i].type == 'text'){
				div.setAttribute('class', 'form-group');
				loginForm.appendChild(div);			
				app.createNewElement(div,'label','col-sm-4 control-label','',loginData[i].label,'for',loginData[i].name,'');
				app.createNewElement(div,'div','col-sm-8','','','','','');
				var parentBlock = document.getElementsByClassName('col-sm-8');
				app.createNewElement(parentBlock[i],'input','form-control',loginData[i].name,'','type',loginData[i].name,'');
			} else if(loginData[i].type == 'submit'){
				div.setAttribute('class', 'form-group');
				loginForm.appendChild(div);
				app.createNewElement(div,'div','col-sm-offset-8 col-sm-1','','','','','');
				var parentBlock = document.getElementsByClassName('col-sm-offset-8');
				app.createNewElement(parentBlock[0],'input','btn btn-primary','','','type',loginData[i].type,loginData[i].value);
			} else if(loginData[i].type == 'checkbox'){

				div.setAttribute('class', 'form-group question-'+(i+1));
				loginForm.appendChild(div);			
				app.createNewElement(div,'div','col-sm-offset-5','','','','','');
				var parentBlock1 = document.getElementsByClassName('col-sm-offset-5');
				
				app.createNewElement(parentBlock1[i],'h4','','',(i+1)+". "+loginData[i].label,'','','');

				app.createNewElement(parentBlock1[i],'div','questions','','','','','');

				var parentBlock2 = document.getElementsByClassName('questions');

				for (var j = 0; j < loginData[i].name.length; j++) {	
					app.createNewElement(parentBlock2[i],'input','form-control',loginData[i].name[j],'','type','checkbox',loginData[i].name[j]);				
					app.createNewElement(parentBlock2[i],'span','','',loginData[i].name[j],'','','');				
				}	
			}
			
		};
	},	

	bindEventLogin: function(){
		var form = document.querySelector('.form');
		form.addEventListener('submit', this.checkUser);
	},

	bindEventTest: function(){
		var form = document.querySelector('.form');
		form.addEventListener('submit', this.checkTest);
	},

	checkTest: function(event){
		event.preventDefault();

		for (var i = 0; i < loginData.length-1; i++) {	

			for (var j = 0; j < loginData[i].name.length; j++) {					
				var checkedValue = document.getElementById('q'+(j));
				/*if (checkedValue.checked){
					console.log('yes');
				} else {
					console.log('no');
				}	*/
				//console.log(checkedValue);
				if(checkedValue.checked){
					console.log('yes'+j);
				}
			}

			/*var checkedValue = document.getElementById('q'+(i+1));
			if (checkedValue.checked){
				checkedValue.style["color"] = "green";
			} else {
				checkedValue.style["color"] = "red";
			}

			var checkedValue = document.querySelector('.q'+(i+1)+':checked').value;
			if(checkedValue === loginData[i].data){
				checkedValue.style["color"] = "green";
			} else {
				checkedValue.style["color"] = "red";
			}*/
		}
	},

	checkUser: function(event){
		event.preventDefault();

		var login = document.getElementById('login'),
			password = document.getElementById('password');
			var div = document.querySelectorAll('.form-group');
			if(loginData['0'].data === login.value && loginData['1'].data === password.value){
				var form = document.querySelector('.form');
				form.innerHTML = '';
				app.testForm();

			} else {					
					div['0'].setAttribute('class', 'form-group has-error');
					div['1'].setAttribute('class', 'form-group has-error');
			}			
	}

}

app.init();
