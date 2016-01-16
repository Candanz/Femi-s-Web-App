var menu = [{id: "--", text: '', price:false}];
var sauces = ['', 'Whiskey', 'Curry', 'Ketchup', 'Rode Saus', 'Mayonaise', 'Knoflook', 'Joppie', 'Speciaal'];
$(document).ready(function() {

    var frm = $('form');
    var name = window.localStorage.getItem('femiName') || "";
    $(frm).find('input#name').val(name);
    $('#addQuestion').on('click', function(e) {
        generateQuestion($('form'));
    });
    $('#delQuestion').on('click', function(e) {
        removeQuestion($('form'));
    })
    $('#payBox').on('change', function(e) {
        var $this = $(this);
        if($this.is(':checked')) {
            showIBAN();
        } else {
            removeIBAN();
        }
    });
    
    $(document).on('keypress', function(e) {
        if(e.keyCode === 43 || e.keyCode === 61) generateQuestion($('form'));
        if(e.keyCode === 45 && !$('#delQuestion').is(':hidden')) removeQuestion($('form'));
    });

    // $.getJSON('/femi/api/menu.php', function(items) {
    //     for(var i = 0; i < items.length; i++ ) {
    //         item = items[i];
    //         menu.push({id: item.id, text: item.name, price: item.price});
    //     }
    //     generateQuestion(frm);
    // });
});

function generateQuestion(form) {
   
        var label = $('<label>').html("Wat wil je hebben?");
        var select = $('<select name="order[]">').addClass('form-control');
           
            
        label.prop('for', 'order[]');

        var group = $('<div>').addClass('question').addClass('form-group').append(label).append(select).hide();
        $(form).find('.checkbox').parent('div.form-group').before(group);
        group.slideDown();
        if($('#delQuestion').is(":hidden")) $('#delQuestion').slideFadeToggle();
        $(select).select2({data:menu, templateResult: formatItem});

        $(select).on('change', function() {
            if($(this).parent('.form-group').find('select').length === 1)
                    showSauceOptions(this);
        });
}

function removeQuestion(form) {
    var questions = $('.question').not('[data-remove]');
    var question = questions[questions.length-1];
        if($(question).find('select').length > 0)
                $(question).attr('data-remove', 'true').slideUp(function() { this.remove(); });
        questions = $('.form-group').not('[data-remove]');
    if(questions.length === 3) {
        $('#delQuestion').slideFadeToggle();
    }
}

function formatItem(item) {
    price = '';
    if(item.price) price = '&euro;'+(item.price/100).toFixed(2);
    var $item = $('<span class="name">'+item.text+'</span><span class="price">'+price+'</span>');
    return $item;
}

function showSauceOptions(select) {
    var group = $(select).parent('.form-group');
    var label = $('<label for="sauce[]">').html("Wil je er wat (extra) saus bij?").hide();
    var select = generateSauce().hide();;
    group.append(label);
    group.append(select);
    $(label).slideDown();
    $(select).slideDown();
}

function generateSauce() {
    var select = $('<select name="sauce[]">').addClass('form-control');
        for(var i = 0; i < sauces.length; i++) {
            var opt = $('<option>').val(sauces[i]).html(sauces[i]);
            select.append(opt);
        }

    return select;

}

function showIBAN() {
    var ibanField = $('#ibanField');
    if(ibanField === undefined || ibanField.length === 0) {
        ibanField = $('<div>').attr('id', 'ibanField').addClass('form-group');
        
        labelIban = $('<label>').html('Vul hier je IBAN nummer in:');
        var iban = window.localStorage.getItem('femiIbanNr') || "";
        input = $('<input>').attr('name', 'iban').attr('required', 'true').addClass('form-control').val(iban);
        labelInputName = $('<label>').html('Ter naam van:');
        var ibanName = window.localStorage.getItem('femiIbanName') || "";
        inputName = $('<input>').attr('name', 'iban_name').attr('required', 'true').addClass('form-control').val(ibanName);

        ibanField.append(labelIban);
        ibanField.append(input);
        ibanField.append(labelInputName);
        ibanField.append(inputName);
        ibanField.hide();
        $('form').find('.checkbox').parent('div.form-group').after(ibanField);
        ibanField.slideDown();
    }
}

function removeIBAN() {
    var ibanField = $('#ibanField');
    if(ibanField !== undefined && ibanField.length !== 0) {
        ibanField.slideUp(function() { this.remove(); });
    }
}