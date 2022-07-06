window.onload = function () {

    let baseCropping = $('#cropped-image').croppie({
        viewport: {
            width: 1000,
            height: 255
        },
        boundary: {
            width: 1100,
            height: 355
        },
        showZoomer: true,
        mouseWheelZoom: 'ctrl'
    })

    function readableFile(file) {
        let reader = new FileReader()
        reader.onload = function (event) {
            baseCropping.croppie('bind', {
                url: event.target.result
            }).then(() => {
                $('.cr-slider').attr({
                    'min': 0.5000,
                    'max': 1.5000
                })
            })
        }
        reader.readAsDataURL(file)
    }

    $('#capa').on('change', function (e) {
        if (this.files[0]) {
            readableFile(this.files[0])
            $('#crop-modal').modal({
                backdrop: 'static',
                keyboard: false
            })
        }
    })

    $('#cancel-cropping').on('click', function () {
        $('#crop-modal').modal('hide')
    })

    $('#upload-image').on('click', function () {
        baseCropping.croppie('result', 'blob').then(blob => {
            let formData = new FormData()
            let file = document.getElementById('capa').files[0]
            let name = generateFileName(file.name)
            formData.append('capa', blob, name)

            let headers = new Headers()
            headers.append('Accept', 'Application/JSON')

            let req = new Request('/upload/header', {
                method: 'POST',
                headers,
                mode: 'cors',
                body: formData
            })
            return fetch(req)
        }).then(data => {
            $('#crop-modal').modal('hide')
            window.location.href = "/perfil";
        })
    })

    function generateFileName(name) {
        const types = /(.jpeg|.jpg|.png|.gif)/
        return Date.now() + name.replace(types, '.gif')
    }

    
    // Imagem de Perfil
    let croppingBase = $('#imagem-cortada').croppie({
        viewport: {
            width: 300,
            height: 300
        },
        boundary: {
            width: 400,
            height: 400
        },
        showZoomer: true,
        mouseWheelZoom: 'ctrl'
    })
    
    function readableFile1(file) {
        let reader = new FileReader()
        reader.onload = function (event) {
            croppingBase.croppie('bind', {
                url: event.target.result
            }).then(() => {
                $('.cr-slider').attr({
                    'min': 0.5000,
                    'max': 1.5000
                })
            })
        }
        reader.readAsDataURL(file)
    }

    $('#fotoPerfil').on('change', function (e) {
        if (this.files[0]) {
            readableFile1(this.files[0])
            $('#perfil').modal({
                backdrop: 'static',
                keyboard: false
            })
        }
    })

    $('#cancelar').on('click', function () {
        $('#perfil').modal('hide')
    })

    $('#salvar').on('click', function () {
        console.log('caiu aqui')
        croppingBase.croppie('result', 'blob').then(blob => {
            let formData = new FormData()
            let file = document.getElementById('fotoPerfil').files[0]
            let name = generateFileName(file.name)
            formData.append('foto', blob, name)
            let headers = new Headers()
            headers.append('Accept', 'Application/JSON')

            let req = new Request('/upload/perfil', {
                method: 'POST',
                headers,
                mode: 'cors',
                body: formData
            })
            return fetch(req)
        }).then(data => {
            $('#perfil').modal('hide')
            window.location.href='/perfil'
        })
    })

}