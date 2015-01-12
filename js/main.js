
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
				name: ['q1','q2'],
				data: 'q2'
			},
			{
				label: 'Вопрос 3',				
				type: 'checkbox',
				name: ['q1','q2','q3','q4'],
				data: 'q3'
			},	
			{
				type: 'submit',
				value: 'Проверить результаты',
			},					
		];
		this.buildForm();	
		this.bindEventTest();
	},

	buildForm: function(){
		var loginForm = document.querySelector('.form');

		for (var i = 0; i < loginData.length; i++) {
			var div = document.createElement('div');			

			if(loginData[i].type == 'text'){
				div.setAttribute('class', 'form-group');
				div.innerHTML = '<label for="'+loginData[i].name+'" class="col-sm-4 control-label">'+loginData[i].label+'</label><div class="col-sm-8"><input type="'+loginData[i].name+'" name="'+loginData[i].name+'" id="'+loginData[i].name+'" class="form-control"></div>';				
			} else if(loginData[i].type == 'submit'){
				div.setAttribute('class', 'form-group');
				div.innerHTML = '<div class="col-sm-offset-8 col-sm-1">';
				div.innerHTML += '<input type="'+loginData[i].type+'" value="'+loginData[i].value+'" class="btn btn-primary">';
				div.innerHTML += '</div>';
			} else if(loginData[i].type == 'checkbox'){
				div.setAttribute('class', 'form-group question-'+(i+1));
				div.innerHTML = '<div class="col-sm-offset-5"><h4>'+(i+1)+'. Вопрос №'+(i+1)+'</h4><div class="questions">';
				for (var j = 0; j < loginData[i].name.length; j++) {					
					div.innerHTML += '<input type="checkbox" name="checkbox_q'+(j+1)+'" id="q'+(j+1)+'" value="q'+(j+1)+'">Ответ '+(j+1)+'<br>';
				}				
				div.innerHTML += '</div></div>';
			}
			loginForm.appendChild(div);
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
