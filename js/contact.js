$(function () {
    'use strict';
    (function () {
        var MIN_NAME_LENGTH = 2,
            MIN_TEXT_LENGTH = 5,
            MIN_PHONE_LENGTH = 2,
            NAME_ERROR_TEXT = 'Minimum 2 characters',
            EMAIL_ERROR_TEXT = 'Please enter correct e-mail',
            PHONE_ERROR_NUMBER = 'Correct number phone',
            MSG_ERROR_TEXT = 'Minimum 5 characters',
            ERROR_CLASS_NAME = 'error',
            SUCCESS_CLASS_NAME = 'ok',

            $contactForm = $('#contactform'),
            $formSuccess = $('.form-success'),
            $nameField = $contactForm.find('#name'),
            $emailField = $contactForm.find('#email'),
            $phoneField = $contactForm.find('#phone'),
            $textField = $contactForm.find('#message');

        function init() {
            _bindEvents();
        }

        function _bindEvents() {
            $('.new-message').click(function() {
                $contactForm.delay(600).slideDown(1000);
                $formSuccess.slideUp(500);
            });

            $nameField.live('blur', _nameValidate);
            $emailField.live('blur', _emailValidate);
            $phoneField.live('blur', _phoneValidate);
            $textField.live('blur', _textValidate);

            $contactForm.live('submit', function () {
                var status = _nameValidate(true) & _emailValidate(true) & _phoneValidate(true) & _textValidate(true);
                if (!!status) {
                    _submitForm();
                }
                return false;
            });
        }

        function _submitForm() {
            $.ajax({
                'type': "post",
                'url': "https://script.google.com/macros/s/AKfycbwjcqwvz1oGu6RDsg1FBDpCYTFMgtDSUtoOvk3dIVa6XnMupzGhLdXfrTQoHxyO9VraSQ/exec",
                'data': {
                    'name': $nameField.val(),
                    'email': $emailField.val(),
                    'phone': $phoneField.val(),
                    'message': $textField.val()
                },
                'success': function (msg) {
                    if (msg === 'SEND') {
                        $contactForm.slideUp(1000);
                        $formSuccess.delay(1000).slideDown(500);
                        setTimeout( function() {
                            // clear form value, shown labels
                            $nameField.val('');
                            $emailField.val('');
                            $phoneField.val('');
                            $textField.val('');
                            $contactForm.find( 'label[for="'+$nameField.attr( 'id' )+'"]').css( 'display', 'block').css( 'opacity', 1 );
                            $contactForm.find( 'label[for="'+$emailField.attr( 'id' )+'"]').css( 'display', 'block').css( 'opacity', 1 );
                            $contactForm.find( 'label[for="'+$phoneField.attr( 'id' )+'"]').css( 'display', 'block').css( 'opacity', 1 );
                            $contactForm.find( 'label[for="'+$textField.attr( 'id' )+'"]').css( 'display', 'block').css( 'opacity', 1 );
                        }, 1000 );
                    }
                    else {
                        $contactForm.slideUp(1000);
                        $formSuccess.delay(1000).slideDown(500);
                        setTimeout( function() {
                            // clear form value, shown labels
                            $nameField.val('');
                            $emailField.val('');
                            $phoneField.val('');
                            $textField.val('');
                            $contactForm.find( 'label[for="'+$nameField.attr( 'id' )+'"]').css( 'display', 'block').css( 'opacity', 1 );
                            $contactForm.find( 'label[for="'+$emailField.attr( 'id' )+'"]').css( 'display', 'block').css( 'opacity', 1 );
                            $contactForm.find( 'label[for="'+$phoneField.attr( 'id' )+'"]').css( 'display', 'block').css( 'opacity', 1 );
                            $contactForm.find( 'label[for="'+$textField.attr( 'id' )+'"]').css( 'display', 'block').css( 'opacity', 1 );
                        }, 1000 );
                    }
                },
                'error': function( t, errorStatus ) {
                    $contactForm.prepend( '<div class="error">' + errorStatus + '</div>' );
                },
                'beforeSend': function() {
                    $(".error,.success").remove();
                }
            });
        }

        function _nameValidate(errIfEmpty) {
            var $memo = $contactForm.find('.indicate-name'),
                val = $nameField.val().replace(/\s+$/g, ''),
                result = false;
            errIfEmpty = errIfEmpty === true ? true : false;

            if (!errIfEmpty && val.length === 0) {
                $memo
                    .text('')
                    .removeClass(SUCCESS_CLASS_NAME)
                    .removeClass(ERROR_CLASS_NAME);
            } else {
                if (val.length >= MIN_NAME_LENGTH) {
                    $memo
                        .text('')
                        .removeClass(ERROR_CLASS_NAME)
                        .addClass(SUCCESS_CLASS_NAME);
                    result = true;
                } else {
                    $memo
                        .text(NAME_ERROR_TEXT)
                        .removeClass(SUCCESS_CLASS_NAME)
                        .addClass(ERROR_CLASS_NAME);
                }
            }
            return result;
        }

        function _emailValidate(errIfEmpty) {
            var $memo = $contactForm.find('.indicate-email'),
                val = $emailField.val().replace(/\s+$/g, ''),
                regExp = /^.+@.+\..{2,6}$/i,
                result = false;
            errIfEmpty = errIfEmpty === true ? true : false;

            if (!errIfEmpty && val.length === 0) {
                $memo
                    .text('')
                    .removeClass(SUCCESS_CLASS_NAME)
                    .removeClass(ERROR_CLASS_NAME);
            } else {
                if (regExp.test(val)) {
                    $memo
                        .text('')
                        .removeClass(ERROR_CLASS_NAME)
                        .addClass(SUCCESS_CLASS_NAME);
                    result = true;
                } else {
                    $memo
                        .text(EMAIL_ERROR_TEXT)
                        .removeClass(SUCCESS_CLASS_NAME)
                        .addClass(ERROR_CLASS_NAME);
                }
            }
            return result;
        }

        function _phoneValidate(errIfEmpty) {
            var $memo = $contactForm.find('.indicate-phone'),
                val = $phoneField.val().replace(/\s+$/g, ''),
                result = false;
            errIfEmpty = errIfEmpty === true ? true : false;

            if (!errIfEmpty && val.length === 0) {
                $memo
                    .text('')
                    .removeClass(SUCCESS_CLASS_NAME)
                    .removeClass(ERROR_CLASS_NAME);
            } else {
                if (val.length >= MIN_PHONE_LENGTH) {
                    $memo
                        .text('')
                        .removeClass(ERROR_CLASS_NAME)
                        .addClass(SUCCESS_CLASS_NAME);
                    result = true;
                } else {
                    $memo
                        .text(PHONE_ERROR_NUMBER)
                        .removeClass(SUCCESS_CLASS_NAME)
                        .addClass(ERROR_CLASS_NAME);
                }
            }
            return result;
        }

        function _textValidate(errIfEmpty) {
            var $memo = $contactForm.find('.indicate-message'),
                val = $textField.val().replace(/\s+$/g, ''),
                result = false;
            errIfEmpty = errIfEmpty === true ? true : false;

            if (!errIfEmpty && val.length === 0) {
                $memo
                    .text('')
                    .removeClass(SUCCESS_CLASS_NAME)
                    .removeClass(ERROR_CLASS_NAME);
            } else {
                if (val.length >= MIN_TEXT_LENGTH) {
                    $memo
                        .text('')
                        .removeClass(ERROR_CLASS_NAME)
                        .addClass(SUCCESS_CLASS_NAME);
                    result = true;
                } else {
                    $memo
                        .text(MSG_ERROR_TEXT)
                        .removeClass(SUCCESS_CLASS_NAME)
                        .addClass(ERROR_CLASS_NAME);
                }
            }
            return result;
        }

        init();
    })();
});
