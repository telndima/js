
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
				name: 'pass',
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

	createNewElement: function(blockPlace, blockTag, blockClass, blockName, blockInnerHtml, blockAttrVal, blockAttrPar, blockValue){
		var newBlock = document.createElement(blockTag);
		if (blockClass)
			newBlock.className = blockClass;
		if (blockName)
			newBlock.name = blockName;
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
				app.createNewElement(div,'label','col-md-4 control-label','',loginData[i].label,'for',loginData[i].name,'');
				app.createNewElement(div,'div','col-md-6','','','','','');
				var parentBlock = document.getElementsByClassName('col-md-6');
				app.createNewElement(parentBlock[i],'input','form-control',loginData[i].name,'','type',loginData[i].type,'');

			} else if(loginData[i].type == 'submit'){

				div.setAttribute('class', 'form-group');
				loginForm.appendChild(div);
				app.createNewElement(div,'div','col-sm-offset-8 col-md-1','','','','','');
				var parentBlock = document.getElementsByClassName('col-sm-offset-8');
				app.createNewElement(parentBlock[0],'input','btn btn-primary','','','type',loginData[i].type,loginData[i].value);

			} else if(loginData[i].type == 'checkbox'){
				
				div.setAttribute('class', 'col-md-12 question-'+(i+1));
				loginForm.appendChild(div);					
				app.createNewElement(div,'h4','','',(i+1)+". "+loginData[i].label,'','','');
				var parentBlock = document.querySelector('.question-'+(i+1));
				console.log(parentBlock);
				
				for (var j = 0; j < loginData[i].name.length; j++) {	
					app.createNewElement(div,'div','col-md-12 checkbox answer-'+(j+1),'','','','','');
					var childBlock = parentBlock.querySelector('.answer-'+(j+1));
					app.createNewElement(childBlock,'label','answer-label','','','',loginData[i].name[j],'');	
					var labelBlock = childBlock.getElementsByClassName('answer-label');					
					app.createNewElement(labelBlock['0'],'input','',loginData[i].name[j],'','type','checkbox',loginData[i].name[j]);
					var t = document.createTextNode(loginData[i].name[j]);

					labelBlock['0'].appendChild(t);
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

		var login = document.getElementsByName('login'),
			password = document.getElementsByName('pass');
			var div = document.querySelectorAll('.form-group');
			if(loginData['0'].data === login['0'].value && loginData['1'].data === password['0'].value){
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
