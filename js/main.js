const index_startup = () => {
    /* modal */
    const modal_window = document.getElementById('modal-window')
    const modal_window_close_button = document.getElementById('modal-close')
    const modal_window_overlay = document.getElementById('modal-overlay')
    const raise_button = document.getElementById('modal-raise')

    /* form */
    const modal_form = document.getElementById('modal-form')
    const user_name = document.getElementById('user-name')
    const user_email = document.getElementById('user-email')
    const user_message = document.getElementById('user-message-text')

    /* tools */
    const load_personal = () => {
        user_name.value = localStorage.getItem('user_name') || ''
        user_email.value = localStorage.getItem('user_email') || ''
    }

    const set_input_invalid = (inp, text) => {
        inp.setCustomValidity(text)
        inp.oninput = set_self_valid
    }

    const save_personal = () => {
        localStorage.setItem('user_name', user_name.value)
        localStorage.setItem('user_email', user_email.value)
    }

    const disable_body_scroll = () => {
        document.body.classList.add('noscroll')
    }

    const enable_body_scroll = () => {
        document.body.classList.remove('noscroll')
    }

    /* listeners */
    const show_modal = e => {
        modal_form.reset()
        disable_body_scroll()
        load_personal()
        modal_window.classList.add('modal-visible')
    }
    
    const set_self_valid = e => {
        e.target.setCustomValidity('')
    }

    const check_form_valid = e => {

        let can_continue = true
        
        if (user_name.value == '') {
            set_input_invalid(user_name, 'Как к Вам можно обращаться?')
            can_continue = false
        }
        if (user_email.value == '') {
            set_input_invalid(user_email, 'Как с вами связаться?')
            can_continue = false
        }
        if (user_message.value == '') {
            set_input_invalid(user_message, 'Не скажете нам пару слов?')
            can_continue = false
        }
        
        if (can_continue) {
            save_personal()            
        } else e.preventDefault()
    }

    const close_modal = () => {
        modal_window.classList.remove('modal-visible')
        enable_body_scroll()
    }

    /* assigment */ 
    modal_form.addEventListener('submit', check_form_valid)
    raise_button.addEventListener('click', show_modal)
    modal_window_close_button.addEventListener('click', close_modal)
    modal_window_overlay.addEventListener('click', close_modal)
}

window.addEventListener('load', index_startup)