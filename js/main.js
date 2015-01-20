var app = {
    init: function () {
        this.loginForm();
    },

    loginForm: function () {
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
                type: 'password',
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

    testForm: function () {
        loginData = [
            {
                label: 'Вопрос 1',
                type: 'checkbox',
                name: ['q1', 'q2', 'q3'],
                data: 'q2'
            },
            {
                label: 'Вопрос 2',
                type: 'checkbox',
                name: ['q4', 'q5'],
                data: 'q5'
            },
            {
                label: 'Вопрос 3',
                type: 'checkbox',
                name: ['q6', 'q7', 'q8', 'q9'],
                data: ['q6', 'q9']
            },
            {
                type: 'submit',
                value: 'Проверить результаты',
            },
        ];
        this.buildForm();
        this.bindEventTest();
    },

    createNewElement: function (blockPlace, blockTag, blockClass, blockName, blockInnerHtml, blockAttrVal, blockAttrPar, blockValue) {
        var newBlock = document.createElement(blockTag);
        if (blockClass)
            newBlock.className = blockClass;
        if (blockName)
            newBlock.name = blockName;
        if (blockInnerHtml)
            newBlock.innerHTML = blockInnerHtml;
        if (blockAttrVal && blockAttrPar)
            newBlock.setAttribute(blockAttrVal, blockAttrPar);
        if (blockValue)
            newBlock.setAttribute('value', blockValue);
        blockPlace.appendChild(newBlock);
    },

    buildForm: function () {
        var loginForm = document.querySelector('.form');     
        


        for (var i = 0; i < loginData.length; i++) {
            var div = document.createElement('div');


            if (loginData[i].type == 'text' || loginData[i].type == 'password') {

                div.setAttribute('class', 'form-group');
                loginForm.appendChild(div);
                this.createNewElement(div, 'label', 'col-md-4 control-label', '', loginData[i].label, 'for', loginData[i].name, '');
                this.createNewElement(div, 'div', 'col-md-6', '', '', '', '', '');
                var parentBlock = document.getElementsByClassName('col-md-6');
                this.createNewElement(parentBlock[i], 'input', 'form-control', loginData[i].name, '', 'type', loginData[i].type, '');

            } else if (loginData[i].type == 'submit') {

                div.setAttribute('class', 'form-group');
                loginForm.appendChild(div);
                this.createNewElement(div, 'div', 'col-md-12 center-block button-block', '', '', '', '', '');
                var parentBlock = document.getElementsByClassName('button-block');
                this.createNewElement(parentBlock[0], 'input', 'btn btn-primary center-block', '', '', 'type', loginData[i].type, loginData[i].value);

            } else if (loginData[i].type == 'checkbox') {

                div.setAttribute('class', 'panel panel-info question-' + (i + 1));
                loginForm.appendChild(div);
                this.createNewElement(div, 'div', 'panel-heading', '', (i + 1) + ". " + loginData[i].label, '', '', '');
                this.createNewElement(div, 'div', 'panel-body panel-question-' + (i + 1), '', '', '', '', '');
                var PanelParentBlock = document.querySelector('.panel-question-' + (i + 1));
                var parentBlock = document.querySelector('.question-' + (i + 1));



                for (var j = 0; j < loginData[i].name.length; j++) {
                    this.createNewElement(PanelParentBlock, 'div', 'col-md-12 checkbox answer-' + (j + 1), '', '', '', '', '');
                    var childBlock = parentBlock.querySelector('.answer-' + (j + 1));
                    this.createNewElement(childBlock, 'label', 'answer-label', '', '', '', loginData[i].name[j], '');
                    var labelBlock = childBlock.getElementsByClassName('answer-label');
                    this.createNewElement(labelBlock['0'], 'input', 'input', 'checkbox', '', 'type', 'checkbox', loginData[i].name[j]);
                    var t = document.createTextNode(loginData[i].name[j]);

                    labelBlock['0'].appendChild(t);
                }
            }


        }

        //for error message
        this.createNewElement(loginForm, 'div', 'message', '', '', '', '', '');

    },

    bindEventLogin: function () {
        var form = document.querySelector('.form');
        form.addEventListener('submit', this.checkUser);
    },

    bindEventTest: function () {
        var form = document.querySelector('.form');
        form.addEventListener('submit', this.checkTest);
    },

    checkTest: function (event) {
        event.preventDefault();
        var result = {success:0,danger:0,warning:0};

        for (var i = 0; i < loginData.length - 1; i++) {

            var parentBlock = document.querySelector('.question-' + (i + 1));
            var checkboxes = parentBlock.getElementsByTagName('input');
            var checkboxesChecked = [];

            //add checked checkboxes to array
            for (var j = 0; j < checkboxes.length; j++) {
                if (checkboxes[j].checked) {
                    checkboxesChecked.push(checkboxes[j].value);
                }
            }

            if(checkboxesChecked.length == 0){
                parentBlock.setAttribute('class', 'panel panel-warning question-' + (i + 1));
                result.warning++;
            } else {
                //check if true answers - is array
                
                
                if (loginData[i].data instanceof Array) {
                    //few answers
                    var is_same = (checkboxesChecked.length == loginData[i].data.length) && checkboxesChecked.every(function (element, index) {
                            return element === loginData[i].data[index];
                        });
                    if (is_same) {
                        //true
                        parentBlock.setAttribute('class', 'panel panel-success question-' + (i + 1));
                        for (var k = 0; k < checkboxesChecked.length; k++) {
                            var inputs = document.querySelectorAll('input[value="' + loginData[i].data[k] + '"]');
                            var label = inputs['0'].parentNode;
                            var div = label.parentNode;
                            div.setAttribute('class', 'has-success col-md-12 checkbox');
                        }
                        result.success++;
                    } else {
                        //false
                        parentBlock.setAttribute('class', 'panel panel-danger question-' + (i + 1));
                        for (var j = 0; j < checkboxesChecked.length; j++) {
                            var input = document.querySelectorAll('input[value="' + checkboxesChecked[j] + '"]');
                            var label = input['0'].parentNode;
                            var div = label.parentNode;
                            div.setAttribute('class', 'has-error col-md-12 checkbox');
                        }
                        for (var k = 0; k < loginData[i].data.length; k++) {
                            var inputs = document.querySelectorAll('input[value="' + loginData[i].data[k] + '"]');
                            var label = inputs['0'].parentNode;
                            var div = label.parentNode;
                            div.setAttribute('class', 'has-success col-md-12 checkbox');
                        }
                        result.danger++;
                    }

                } else {
                    //one answer

                    if (checkboxesChecked.length == 1 && checkboxesChecked['0'] == loginData[i].data) {
                        //true
                        parentBlock.setAttribute('class', 'panel panel-success question-' + (i + 1));
                        var inputs = document.querySelectorAll('input[value="' + checkboxesChecked['0'] + '"]');
                        var label = inputs['0'].parentNode;
                        var div = label.parentNode;
                        div.setAttribute('class', 'has-success col-md-12 checkbox');
                        result.success++;
                    } else {
                        //false
                        parentBlock.setAttribute('class', 'panel panel-danger question-' + (i + 1));
                        for (var j = 0; j < checkboxesChecked.length; j++) {
                            var input = document.querySelectorAll('input[value="' + checkboxesChecked[j] + '"]');
                            var label = input['0'].parentNode;
                            var div = label.parentNode;
                            div.setAttribute('class', 'has-error col-md-12 checkbox');
                        }

                        var inputs = document.querySelectorAll('input[value="' + loginData[i].data + '"]');
                        var label = inputs['0'].parentNode;
                        var div = label.parentNode;
                        div.setAttribute('class', 'has-success col-md-12 checkbox');
                        result.danger++;
                    }

                } 
            }

            


        }
        
        // Error message
        var messageBlock = document.querySelector('.message');
        if(result.warning == 0){
            messageBlock.setAttribute('class', 'message alert alert-info');
            var message = 'Ваш результат: Ошибок: '+result.danger+'. Правильных ответов: '+result.success;
            messageBlock.innerHTML = message;
        } else {
            messageBlock.setAttribute('class', 'message alert alert-warning');
            message = "Пожалуйста, выберите варианты ответов";
            messageBlock.innerHTML = message;
        }
        
    },

    checkUser: function (event) {
        event.preventDefault();

        var login = document.getElementsByName('login'),
            password = document.getElementsByName('pass');
        var div = document.querySelectorAll('.form-group');
        if (loginData['0'].data == login['0'].value && loginData['1'].data == password['0'].value) {
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
