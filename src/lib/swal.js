import Swal from 'sweetalert2'

export const swalAlert = (title, icon = 'info', text = '') => {
    // icon : info, error, succes, warning, question
    Swal.fire({
        title,
        text,
        icon,
    })
}

export const swalConfirm = (
    title,
    icon = 'question',
    text = '',
    confirmButtonText = 'Yes',
) => {
    return Swal.fire({
        title,
        text,
        icon,
        showCancelButton: true,
        confirmButtonText,
    })
}

export const swalErrorMessage = err => {
    Swal.fire({
        title:
            err?.response?.data?.message ||
            'something went wrong, please try again',
        icon: 'error',
    })
}
