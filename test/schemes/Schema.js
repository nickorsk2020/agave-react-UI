let Schema = {
    "nameform":"list_elements",
    "errorForm":"Данные заполнены не верно",
    "classes": {
        "form": "loginform",
        "label": "col-md-4 control-label",
        "input": "col-md-6 form-control",
        "errorMessage": "error-input",
        "errorForm":"error-form-validate"
    },
    "elements": {
        "image":{
            "type":'image',
            "classes":{
                "label":"",
                "element":""
            },
            "props": {
                "name": "image",
                "description":"Размер должен быть не более 1 Мб"
            }
            ,
            "value": "https://facebook.github.io/react/img/logo.svg",
            "validators": [
                {
                    "type": "fileNotEmpty",
                    "error": "Пустое значение"
                },
                {
                    "type": "fileType",
                    "values": "jpeg,jpg,png,gif",
                    "error":"Это не изображение"
                },
                {
                    "type":"maxFileSize",
                    "value":1000,
                    "error":"Файл больше 1 мегабайта"
                }
            ]
        },
        "static": {
            "type":'static',
            "classes":{
                "container":"static-container",
            },
            "props": {
                "html":"<p><b>static</b><br/>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>"
            }
        },
        "file":{
            "type":'file',
            "classes":{
                "label":"",
                "element":""
            },
            "props": {
                "name": "file",
                "description":"Размер должен быть не более 5 Мб"
            }
            ,
            "value": "",
            "validators": [
                {
                    "type": "fileNotEmpty",
                    "error": "Пустое значение"
                },
                {
                    "type": "fileType",
                    "values": "pdf,doc",
                    "error":"Поддерживается только pdf и doc формат"
                },
                {
                    "type":"maxFileSize",
                    "value":1000,
                    "error":"Файл больше 1 мегабайта"
                },
                {
                    "type":"minFileSize",
                    "value":500,
                    "error":"Файл меньше 500 килобайт"
                }
            ]
        },
        "input": {
            "type":'input',
            "classes":{
                "label":"",
                "element":""
            },
            "props": {
                "name": "input",
                "type": "text"
            },
            "value": "",
            "validators": [
                {
                    "type": "notNull",
                    "error": "пустое значение"
                }
            ]
        },
        "tinymce":{
            "type":'tinymce',
            "classes":{
                "label":"",
                "element":""
            },
            "props": {
                "name": "tinymce",
                "height":150,
                "toolbar1": 'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',
                "toolbar2": 'print preview media | forecolor backcolor emoticons',
                "plugins": [
                    'advlist autolink lists link image charmap print preview hr anchor pagebreak',
                    'searchreplace wordcount visualblocks visualchars code fullscreen',
                    'insertdatetime media nonbreaking save table contextmenu directionality',
                    'emoticons template paste textcolor colorpicker textpattern imagetools'
                ],
            },
            "value": "",
            "validators": [
                {
                    "type": "notNull",
                    "error": "Пустое значение"
                }
            ]
        },
        "select": {
            "type":'select',
            "classes":{
                "label":"",
                "element":""
            },
            "props": {
                "name": "select"
            },
            "value":"",
            "values": [
                {"value":1,"text":"тип 1"},
                {"value":2,"text":"тип 2"},
                {"value":3,"text":"тип 3"},
            ],
            "validators": [
                {
                    "type": "notNull",
                    "error": "Пустое значение"
                }
            ]
        },
        "datepicker": {
            "type":'datepicker',
            "classes":{
                "label":"",
                "element":""
            },
            "props": {
                "name": "datepicker",
                "placeholder":"Выбирите дату",
                "range-years":"2012-2020",
                "placeholder-hour":"Введите часы",
                "placeholder-minute":"Введите минуты"
            },
            "value":"",
            "validators": [
                {
                 "type": "notNull",
                 "error": "Пустое значение"
                 }
            ]
        },
        "textarea": {
            "type":'textarea',
            "classes":{
                "label":"",
                "input":""
            },
            "props": {
                "name": "textarea"
            }
            ,
            "value": "",
            "validators": [
                {
                    "type": "notNull",
                    "error": "Пустое значение"
                }
            ]
        },
        "radioButtons": {
            "type":'radioButtons',
            "classes":{
                "label":"",
                "element":""
            },
            "props": {
                "name": "radioButtons"
            },
            "value":"",
            "values": [
                {"value":1,"text":"тип 1"},
                {"value":2,"text":"тип 2"},
                {"value":3,"text":"тип 3"},
            ],
            "validators": [
                {
                    "type": "notNull",
                    "error": "Пустое значение"
                }
            ]
        },
        "checkboxes": {
            "type":'checkBoxes',
            "classes":{
                "label":"",
                "element":""
            },
            "props": {
                "name": "checkBoxes"
            },
            "value":"",
            "values": [
                {"value":"a","text":"тип 1"},
                {"value":"b","text":"тип 2"},
                {"value":"c","text":"тип 3"},
            ],
            "validators": [
                {
                    "type": "notNull",
                    "error": "Пустое значение"
                }
            ]
        },
        "submit": {
            "type":'submit',
            "classes":{
                "button":"btn btn-primary",
            },
            "props": {
                "name":"submit"
            }
        }
    }
};
export  default Schema;