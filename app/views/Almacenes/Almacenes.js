let strs = null;
let strnme = '';

$(document).ready(function () {
    verifica_usuario();
    inicial();
});

function inicial() {
    settingTable();
    getStores();
    fillStores();
}

function settingTable() {
    let title = 'Lista de Catálogos';
    let filename = title.replace(/ /g, '_') + '-' + moment(Date()).format('YYYYMMDD');
    $('#AlmacenesTable').DataTable({
        order: [[2, 'asc']],
        dom: 'Blfrtip',
        lengthMenu: [
            [100, 200, 300, -1],
            [100, 200, 300, 'Todos'],
        ],
        buttons: [
            {
                //Botón para Excel
                extend: 'excel',
                footer: true,
                title: title,
                filename: filename,

                //Aquí es donde generas el botón personalizado
                text: '<button class="btn btn-excel"><i class="fas fa-file-excel"></i></button>',
            },
            {
                //Botón para PDF
                extend: 'pdf',
                footer: true,
                title: title,
                filename: filename,

                //Aquí es donde generas el botón personalizado
                text: '<button class="btn btn-pdf"><i class="fas fa-file-pdf"></i></button>',
            },
            {
                //Botón para imprimir
                extend: 'print',
                footer: true,
                title: title,
                filename: filename,

                //Aquí es donde generas el botón personalizado
                text: '<button class="btn btn-print"><i class="fas fa-print"></i></button>',
            },
            {
                text: 'Borrar seleccionados',
                // className: 'btn-apply hidden-field',
                // action: function () {
                //     var selected = table.rows({selected: true}).data();
                //     var idSelected = '';
                //     selected.each(function (index) {
                //         idSelected += index[1] + ',';
                //     });
                //     idSelected = idSelected.slice(0, -1);
                //     if (idSelected != '') {
                //         ConfirmDeletAlmacen(idSelected);
                //    }
                //},
            },
        ],
        pagingType: 'simple_numbers',
        language: {
            url: 'app/assets/lib/dataTable/spanish.json',
        },
        scrollY: 'calc(100vh - 200px)',
        scrollX: true,
        fixedHeader: true,
        columns: [
            {data: 'editable', class: 'edit', orderable: false},
            {data: 'storesid', class: 'strid'},
            {data: 'storname', class: 'store-name'},
            {data: 'storownr', class: 'store-owner'},
            {data: 'stortype', class: 'store-type'},
            {data: 'quantity', class: 'quantity'},
        ],
    });
}

function getStores() {
    // Solicita los productos de un almacen seleccionado
    var pagina = 'Almacenes/GetAlmacenes';
    var par = `[{"str_id":""}]`;
    var tipo = 'json';
    var selector = putStores;
    fillField(pagina, par, tipo, selector);
}

function putStores(dt) {
    strs = dt;
}
function fillStores() {
    if (strs != null) {
        let tabla = $('#AlmacenesTable').DataTable();
        $.each(strs, function (v, u) {
            fillTableStores(v);
        });
    } else {
        setTimeout(() => {
            fillStores();
        }, 100);
    }
}

function actionButtons() {
    /**  ---- Acciones de edición ----- */
    $('td.edit i')
        .unbind('click')
        .on('click', function () {
            let acc = $(this).attr('class').split(' ')[2];
            let strId = $(this).parents('tr').attr('id');

            switch (acc) {
                case 'modif':
                    editStore(strId);
                    break;
                case 'kill':
                    deleteStore(strId);
                    break;
                default:
            }
        });

    $('.toLink')
        .unbind('click')
        .on('click', function () {
            let strId = $(this).parents('tr').attr('id');
            let quant = $(this).html();
            let ctnme = $(this).parents('tr').children('td.store-name').html();
            strnme = ctnme;
            console.log(strId, quant, ctnme);
            if (quant > 0) {
                $('.deep_loading').css({display: 'flex'});
                var pagina = 'Almacenes/listSeries';
                var par = `[{"strId":"${strId}"}]`;
                var tipo = 'json';
                var selector = putSeries;
                fillField(pagina, par, tipo, selector);
            }
        });

    /**  ---- Acciones de Guardar categoria ----- */
    $('#GuardarAlmacen')
        .unbind('click')
        .on('click', function () {
            if (validaFormulario() == 1) {
                if ($('#IdAlmacen').val() == '') {
                    saveStore();
                } else {
                    updateStore();
                }
            }
        });
    /**  ---- Lismpia los campos ----- */
    $('#LimpiarFormulario')
        .unbind('click')
        .on('click', function () {
            $('#NomAlmacen').val('');
            $('#IdAlmacen').val('');
            $('#selectTipoAlmacen option[value="0"]').attr('selected', true);
            $('#selectRowEncargado').val('');
        });
}

function fillTableStores(ix) {
    let tabla = $('#AlmacenesTable').DataTable();
    // console.log(strs.length);
    tabla.row
        .add({
            editable: `<i class="fas fa-pen modif" id ="md${strs[ix].str_id}"></i><i class="fas fa-times-circle kill"></i>`,
            storesid: strs[ix].str_id,
            storname: strs[ix].str_name,
            storownr: strs[ix].emp_fullname,
            stortype: strs[ix].str_type,
            quantity: `<span class="toLink">${strs[ix].cantidad}</span>`,
        })
        .draw();
    $('#md' + strs[ix].str_id)
        .parents('tr')
        .attr('id', strs[ix].str_id);
    get_quantity(strs[ix].str_id);
    actionButtons();
}

function saveStore() {
    var strName = $('#NomAlmacen').val();
    var empName = $('#selectRowEncargado').val();
    var strtype = $('#selectTipoAlmacen').val();
    var par = `
        [{
            "str_name"   : "${strName}",
            "str_type"   : "${strtype}",
            "emp_name"   : "${empName}"
        }]`;

    strs = '';
    var pagina = 'Almacenes/SaveAlmacen';
    var tipo = 'html';
    var selector = putSaveStore;
    fillField(pagina, par, tipo, selector);
}
function putSaveStore(dt) {
    getStores();
    if (strs.length > 0) {
        let ix = goThroughStore(dt);
        fillTableStores(ix);
        $('#LimpiarFormulario').trigger('click');
    } else {
        setTimeout(() => {
            putSaveStore(dt);
        }, 100);
    }
}

function updateStore() {
    var strId = $('#IdAlmacen').val();
    var strName = $('#NomAlmacen').val();
    var empName = $('#selectRowEncargado').val();
    var strType = $('#selectTipoAlmacen option:selected').val();
    var par = `
        [{
            "str_id"        : "${strId}",
            "str_name"      : "${strName}",
            "emp_name"      : "${empName}",
            "str_type"      : "${strType}"
        }]`;

    strs = '';
    var pagina = 'Almacenes/UpdateAlmacen';
    var tipo = 'html';
    var selector = putUpdateStore;
    fillField(pagina, par, tipo, selector);
}
function putUpdateStore(dt) {
    getStores();
    if (strs.length > 0) {
        // console.log(dt);
        let ix = goThroughStore(dt);
        // console.log(strs[ix].str_id);

        // console.log($(`#${strs[ix].str_id}`).children('td.store-name').html());

        $(`#${strs[ix].str_id}`).children('td.store-name').html(strs[ix].str_name);
        $(`#${strs[ix].str_id}`).children('td.store-owner').html(strs[ix].emp_fullname);
        $(`#${strs[ix].str_id}`).children('td.store-type').html(strs[ix].str_type);

        putQuantity(strs[ix].str_id);
        $('#LimpiarFormulario').trigger('click');
    } else {
        setTimeout(() => {
            putUpdateStore(dt);
        }, 100);
    }
}

function editStore(strId) {
    let ix = goThroughStore(strId);
    $('#NomAlmacen').val(strs[ix].str_name);
    $('#IdAlmacen').val(strs[ix].str_id);
    $('#selectRowEncargado').val(strs[ix].emp_fullname);
    $('#selectTipoAlmacen').val(strs[ix].str_type);
}

function deleteStore(strId) {
    let cn = $(`#${strId}`).children('td.quantity').children('.toLink').html();

    if (cn != 0) {
        $('#NoBorrarModal').modal('show');
    } else {
        $('#BorrarAlmacenModal').modal('show');
        $('#IdAlmacenBorrar').val(strId);

        $('#BorrarProveedor').on('click', function () {
            var pagina = 'Almacenes/DeleteAlmacen';
            var par = `[{"str_id":"${strId}"}]`;
            var tipo = 'html';
            var selector = putDeleteStore;
            fillField(pagina, par, tipo, selector);
        });
    }
}
function putDeleteStore(dt) {
    getStores();
    let tabla = $('#AlmacenesTable').DataTable();
    tabla
        .row($(`#${dt}`))
        .remove()
        .draw();
    $('#BorrarAlmacenModal').modal('hide');
}

function putSeries(dt) {
    console.log(dt);
    $('#ExisteStrModal').removeClass('overlay_hide');
    $('#tblStrSerie').DataTable({
        destroy: true,
        order: [[1, 'asc']],
        lengthMenu: [
            [100, 150, 200, -1],
            [100, 150, 200, 'Todos'],
        ],
        pagingType: 'simple_numbers',
        language: {
            url: 'app/assets/lib/dataTable/spanish.json',
        },
        scrollY: 'calc(100vh - 290px)',
        scrollX: true,
        fixedHeader: true,
        columns: [
            {data: 'sermodif', class: 'edit'},
            {data: 'produsku', class: 'sku'},
            {data: 'serlnumb', class: 'product-name'},
            {data: 'dateregs', class: 'sku'},
            {data: 'servcost', class: 'quantity'},
            {data: 'cvsituat', class: 'code-type_s'},
            {data: 'cvestage', class: 'code-type_s'},
            {data: 'comments', class: 'comments'},
        ],
    });

    $('#ExisteStrModal .btn_close')
        .unbind('click')
        .on('click', function () {
            $('.overlay_background').addClass('overlay_hide');
        });

    build_modal_serie(dt);
}

/** +++++  Coloca los seriales en la tabla de seriales */
function build_modal_serie(dt) {
    let tabla = $('#tblStrSerie').DataTable();
    $('.overlay_closer .title').html(`Catalogo - ${strnme}`);
    tabla.rows().remove().draw();
    $.each(dt, function (v, u) {
        tabla.row
            .add({
                sermodif: `<i></i>`,
                produsku: `${u.ser_sku.slice(0, 7)}-${u.ser_sku.slice(7, 11)}`,
                serlnumb: u.ser_serial_number,
                dateregs: u.ser_date_registry,
                servcost: u.ser_cost,
                cvsituat: u.ser_situation,
                cvestage: u.ser_stage,
                comments: u.ser_comments,
            })
            .draw();
        $(`#E${u.ser_id}`).parents('tr').attr('data-product', u.prd_id);
        $('.deep_loading').css({display: 'none'});
    });
}

function get_quantity(strId) {
    var pagina = 'Almacenes/countQuantity';
    var par = `[{"strId":"${strId}"}]`;
    var tipo = 'json';
    var selector = putQuantity;
    fillField(pagina, par, tipo, selector);
}

function putQuantity(dt) {
    let strid = dt[0].str_id;
    let qty = dt[0].cantidad;
    $('#' + strid)
        .children('td.quantity')
        .children('.toLink')
        .html(qty);
    $('#' + strid)
        .children('td.quantity')
        .attr('data-content', qty);
}

function goThroughStore(strId) {
    let inx = -1;
    $.each(strs, function (v, u) {
        if (strId == u.str_id) inx = v;
    });
    return inx;
}

//Valida los campos seleccionado *
function validaFormulario() {
    var valor = 1;
    var forms = document.querySelectorAll('.needs-validation');
    Array.prototype.slice.call(forms).forEach(function (form) {
        if (!form.checkValidity()) {
            form.classList.add('was-validated');
            valor = 0;
        }
    });
    return valor;
}
