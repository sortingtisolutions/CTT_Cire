let cust, proj, relc, vers, prod, disc;

$('document').ready(function () {
    url = getAbsolutePath();
    verifica_usuario();
    inicial();
});

function inicial() {
    get_customers();
    get_projects();
    get_discounts();
    button_actions();
    //  get_customers_owner();
}

/** OBTENCION DE DATOS */
/**  Obtiene el listado de clientes */
function get_customers() {
    var pagina = 'ProjectDetails/listCustomers';
    var par = `[{"prm":""}]`;
    var tipo = 'json';
    var selector = put_customers;
    caching_events('get_customers');
    fillField(pagina, par, tipo, selector);
}

/**  Obtiene el listado de proyectos */
function get_projects() {
    var pagina = 'ProjectDetails/listProjects';
    var par = `[{"prm":""}]`;
    var tipo = 'json';
    var selector = put_projects;
    caching_events('get_projects');
    fillField(pagina, par, tipo, selector);
}

/** Obtiene el listado de los tipos de proyecto */
function load_project_type() {
    var pagina = 'ProjectDetails/listProjectsType';
    var par = `[{"pjt":""}]`;
    var tipo = 'json';
    var selector = put_projects_type;
    caching_events('put_projects_type');
    fillField(pagina, par, tipo, selector);
}

/**  Obtiene los Id's de los elementos relacionados con la seleccion del cliente */
function get_rel_customers(cusId, cutId) {
    var pagina = 'ProjectDetails/listCustomersDef';
    var par = `[{"cusId":"${cusId}", "cutId":"${cutId}"}]`;
    var tipo = 'json';
    var selector = put_rel_customers;
    caching_events('get_rel_customers');
    fillField(pagina, par, tipo, selector);
}

/**  Obtiene los Id's de los elementos relacionados con la seleccion del cliente */
function get_customers_owner() {
    var pagina = 'ProjectDetails/listCustomersOwn';
    var par = `[{"cusId":"", "cutId":""}]`;
    var tipo = 'json';
    var selector = put_customers_owner;
    caching_events('get_customers_owner');
    fillField(pagina, par, tipo, selector);
}
/**  Obtiene los Id's de los proyectos relacionados con la seleccion del cliente */
function get_rel_projects(id, prn) {
    var pagina = 'ProjectDetails/listProjectsDef';
    var par = `[{"cusId":"${id}"}]`;
    var tipo = 'json';
    var selector = put_rel_projects;
    caching_events('get_rel_projects');
    fillField(pagina, par, tipo, selector);
}

/**  Obtiene el listado de proyectos */
function get_version(pjtId) {
    var pagina = 'ProjectDetails/listVersion';
    var par = `[{"pjtId":"${pjtId}"}]`;
    var tipo = 'json';
    var selector = put_version;
    caching_events('get_version');
    fillField(pagina, par, tipo, selector);
}

/**  Obtiene el listado de cotizaciones */
function get_budgets(pjtId) {
    let dstrO = $('#PeriodProject').text().split(' - ')[0];
    let dendO = $('#PeriodProject').text().split(' - ')[1];
    let dstr = moment(dstrO, 'DD/MM/YYYY').format('YYYY-MM-DD');
    let dend = moment(dendO, 'DD/MM/YYYY').format('YYYY-MM-DD');
    var pagina = 'ProjectDetails/listBudgets';
    var par = `[{"pjtId":"${pjtId}","dstr":"${dstr}","dend":"${dend}"}]`;
    var tipo = 'json';
    var selector = put_budgets;
    caching_events('get_budgets');
    fillField(pagina, par, tipo, selector);
}

/**  Obtiene el listado de descuentos */
function get_discounts() {
    var pagina = 'ProjectDetails/listDiscounts';
    var par = `[{"level":"1"}]`;
    var tipo = 'json';
    var selector = put_discounts;
    caching_events('get_discounts');
    fillField(pagina, par, tipo, selector);
}

/**  Obtiene el listado de proyectos */
function get_products(word, dstr, dend) {
    var pagina = 'ProjectDetails/listProducts';
    var par = `[{"word":"${word}","dstr":"${dstr}","dend":"${dend}"}]`;
    var tipo = 'json';
    var selector = put_products;
    caching_events('get_products');
    fillField(pagina, par, tipo, selector);
}

/**  Obtiene el listado de relacionados al prducto*/
function get_products_related(id, tp, pj) {
    var pagina = 'ProjectDetails/listProductsRelated';
    var par = `[{"prdId":"${id}","type":"${tp}","pjtcnid":"${pj}"}]`;
    var tipo = 'json';
    var selector = put_products_related;
    caching_events('get_products');
    fillField(pagina, par, tipo, selector);
}

/**  Llena el listado de prductores */
function put_customers(dt) {
    caching_events('put_customers');
    cust = dt;
    $.each(cust, function (v, u) {
        let H = ` <li id="C${u.cus_id}" class="enable" data_content="${v}|${u.cut_name}">${u.cus_name}</li>`;
        $('#Customer .list_items ul').append(H);
    });
    select_customer();
}

/**  Llena el listado de proyectos */
function put_projects(dt) {
    caching_events('put_projects');
    if (dt[0].pjt_id > 0) {
        proj = dt;
        $.each(proj, function (v, u) {
            let H = ` <li id="P${u.pjt_id}" class="enable" data_content="${v}|${u.cus_id}|${u.cus_parent}|${u.cuo_id}">${u.pjt_name}</li>`;
            $('#Projects .list_items ul').append(H);
        });

        selector_projects();
    } else {
        $('#Projects .list_items ul').html('');
    }
}

/** Llena el listado de los tipos de proyecto */
function put_projects_type(dt) {
    $.each(dt, function (v, u) {
        let H = `<option value="${u.pjttp_id}"> ${u.pjttp_name}</option>`;
        $('#txtTypeProject').append(H);
    });
}

/**  Llena el listado de prductores */
function put_rel_customers(dt) {
    caching_events('put_rel_customers');
    $('#Relation .list_items ul li').css({display: 'none'});
    $.each(dt, function (v, u) {
        $(`#R${u.cus_id}`).css({display: 'block'});
    });
    select_relation();
}

/**  Llena el listado de prductores */
function put_customers_owner(dt) {
    caching_events('put_customers_owner');
    relc = dt;
}

/**  Llena el listado de descuentos */
function put_discounts(dt) {
    caching_events('put_discounts');
    disc = dt;
}

/**  Llena el listado de prductores */
function put_rel_projects(dt) {
    caching_events('put_rel_projects');
    $('#Projects .list_items ul li').removeClass('enable').addClass('disable');
    $.each(dt, function (v, u) {
        $('#Projects .list_items ul li').each(function () {
            let grp = $(this).attr('data_content');
            let pard = grp.split('|')[3];
            if (pard == u.cuo_id) {
                $(this).addClass('enable').removeClass('disable');
            }
        });
    });
    selector_projects();
}
/**  Llena el listado de versiones */
function put_version(dt) {
    caching_events('put_version');
    let H = `
    <div class="full text_center">
        <h6>DOCUMENTOS</h6>
    </div>`;
    $('#versions').html(H);

    if (dt[0].ver_id != 0) {
        $.each(dt, function (v, u) {
            H = `
            <div class="blocks documents">
                <div class="half vers left" id="V${u.ver_id}">${u.ver_code}</div>
                <div class="half right">${moment(u.ver_date).format('DD-MMM-yyyy')}</div>
            </div>
        `;
            $('#versions').append(H);
        });
        let vr = parseInt(dt[0].ver_code.substring(1, 10));
        let vt = refil(vr + 1, 4);
        $('#version').html('C' + vt);

        $('.documents .vers')
            .unbind('click')
            .on('click', function () {
                vers = $(this).attr('id').substring(1, 100);
                let code = $(this).text();
                $('.box_list_products').css({display: 'none'});
                get_budgets();
                fill_dinamic_table();
                add_boton();
                $('.menu_version').html('Versión: ' + code);
                $('.menu_version').attr('data_content', vers);
                hide_control_menu('block');
            });
    } else {
        $('#version').text('C0001');
        let vr = parseInt($('#version').text().substring(1, 10));
    }
}

/**  Llena el listado de cotizaciones */
function put_budgets(dt) {
    caching_events('put_budgets');
    let days = get_days_period();
    if (dt[0].pjtcn_id > 0) {
        $.each(dt, function (v, u) {
            let jsn = JSON.stringify(u);
            fill_budget_prods(jsn, days, '1');
        });
    } else {
        console.log('no budgets there are');
    }
}

/**  Llena el listado de productos */
function put_products(dt) {
    caching_events('put_products');
    prod = dt;
    $.each(dt, function (v, u) {
        let level = '';
        switch (u.prd_level) {
            case 'A':
                level = 'ACCESORIOS';
                break;
            case 'K':
                level = 'PAQUETES';
                break;
            case 'P':
                level = 'PRODUCTOS';
                break;
            default:
        }
        if (u.prd_name != undefined) {
            let H = `
                <li data_indx ="${v}" data_content="${u.prd_sku}|${u.prd_name.replace(/"/g, '')}|${u.srv_id}">
                    <div class="prodName">${u.prd_name}</div>
                    <div class="prodStock">${u.stock}</div>
                    <div class="prodLevel">${level}</div>
                </li>
            `;
            $('.list_products ul').append(H);
        }
    });

    $('.list_products ul li')
        .unbind('click')
        .on('click', function () {
            let inx = $(this).attr('data_indx');
            fill_budget(prod[inx], inx);
        });
}

/**  Activa los botones de acciones */
function button_actions() {
    caching_events('button_actions');
    $('#addProducer')
        .unbind('click')
        .on('click', function () {
            add_client();
        });

    $('#addProject')
        .unbind('click')
        .on('click', function () {
            add_project();
        });

    $('#newQuote')
        .unbind('click')
        .on('click', function () {
            // new_quote();
            window.location = 'Budget';
        });
    $('.frame_fix_col .sel i').on('click', function (e) {
        let idsel = $(this).attr('id');
        let x = e.pageX;
        let y = e.pageY;
        show_minimenues(idsel, x, y);
    });

    $('.dato')
        .unbind('keyup')
        .on('keyup', function () {
            let idSel = $(this).attr('id');
            let grp = $(`#${idSel} .grouper`).text().toUpperCase();
            $(`#${idSel}`).children('.list_items').slideDown(200);
            $(`#${idSel}`).children('i').addClass('rotar');
            $('.customerType').html('');
            sel_items(grp, idSel);
        });

    $('.dato .grouper')
        .unbind('focus')
        .on('focus', function () {
            $('.list_items').slideUp(200);
            $('i').removeClass('rotar');
        });

    $('.dato')
        .parent()
        .parent()
        .parent()
        .on('mouseleave', function () {
            $('.list_items').slideUp(200);
            $('i').removeClass('rotar');
        });

    $('.dato .fa-caret-down')
        .unbind('click')
        .on('click', function () {
            //console.log($(this).parent().html());
            let idSel = $(this).parent().attr('id');
            let clss = $(`#${idSel}`).children('i').attr('class').indexOf('rotar');
            $('.list_items').slideUp(200);
            $('i').removeClass('rotar');
            if (clss < 0) {
                $(`#${idSel}`).children('.list_items').slideDown(200);
                $(`#${idSel}`).children('i').addClass('rotar');
            }
        });

    $('.dato')
        .unbind('change')
        .on('change', function () {
            console.log($(this).html());
        });

    $('.serc')
        .unbind('click')
        .on('click', function () {
            let projFind = $('#numProject .search').text();
            let found = 0;
            console.log(projFind, proj);
            $.each(proj, function (v, u) {
                if (projFind == u.pjt_number) {
                    console.log(u);
                    $('#C' + u.cus_id).trigger('click');
                    $('#P' + u.pjt_id).trigger('click');
                    $('#R' + u.cus_parent).trigger('click');
                    found = 1;
                }
            });
            if (found == 0) {
                $('.error').html('Proyecto no encontrado');
                clean_projects_field();
                clean_customer_field();
                setTimeout(() => {
                    $('.error').html('&nbsp;');
                }, 3000);
            } else {
                $('.error').html('&nbsp;');
            }
        });

    $('#addBudget')
        .unbind('click')
        .on('click', function () {
            let nRows = $('.frame_content table tbody tr').length;
            if (nRows > 1) {
                save_version();
            }
        });
}

/** Coloca el boton de agregar nuevo producto en la tabla  */
function add_boton() {
    caching_events('add_boton');
    let H = `
    <tr>
        <td colspan="12">
            <button class="btn-add" id="addProduct">+ agregar producto</button>
        </td>
    </tr>
    `;
    $('#tblControl tbody').append(H);

    $('.frame_fix_row #addProduct').on('click', function (e) {
        var posLeft = $('.frame_fix_row #addProduct').offset().left;
        var posTop = $('.frame_fix_row #addProduct').offset().top;

        let hg = parseFloat($('.frame_fix_row').css('height'));
        let pt = $('.frame_fix_row').offset().top;
        let pb = hg + pt;
        let lm = (pb / 4) * 3;

        let h1 = parseFloat($('.box_list_products').css('height'));

        if (posTop > lm) {
            posTop = posTop - (h1 - 20);
            $('.list_products').css({bottom: '26px'});
            $('.sel_product').css({top: h1 - 26 + 'px'});
        } else {
            $('.list_products').css({top: '20px'});
            $('.sel_product').css({top: 0});
        }

        hide_control_menu('none');

        $('.box_list_products')
            .css({top: posTop + 'px', left: posLeft + 'px'})
            .slideDown(200);
        $(`.list_products`).css({display: 'none'});

        $('.box_list_products')
            .unbind('mouseleave')
            .on('mouseleave', function () {
                $('.box_list_products').slideUp(200);
                $('.sel_product').text('');
                $(`#Products .list_products ul`).html('');
            });

        $('#Products .sel_product')
            .unbind('keyup')
            .on('keyup', function () {
                let idSel = $(this).parent().attr('id');
                let text = $(this).text().toUpperCase();
                sel_product(text, idSel);
            });
    });
}

function modal_products() {
    caching_events('modal_products');
    $('.box_modal_deep').css({display: 'flex'});
    $('.box_modal').animate(
        {
            top: '70px',
        },
        500
    );
}

/** Selectores de items */
/** Clientes */
function select_customer() {
    caching_events('select_customer');
    $('#Customer .list_items ul li.enable')
        .unbind('click')
        .on('click', function () {
            let idSel = $(this).parents('.dato');
            let indx = $(this).attr('data_content').split('|')[0];
            let type = $(this).attr('data_content').split('|')[1];
            idSel.children('.grouper').html('<i class="fas fa-times-circle clean"></i> ' + $(this).html());
            idSel.children('.customerType').html('<span>' + type + '</span>');
            $('.list_items').slideUp(200);
            $('i').removeClass('rotar');
            let cs = cust[indx];
            let respons = cs.cut_id == 1 ? 'Productor responsable' : 'Casa productora';
            $('#Relation').parent().children('.concepto').html(respons);
            $('#AddressProducer').html(cs.cus_address);
            $('#EmailProducer').html(cs.cus_email);
            $('#PhoneProducer').html(cs.cus_phone);
            $('#QualificationProducer').html(cs.cus_qualification);
            $('#Relation .grouper').html('');
            $('#Customer .grouper').attr('data_identy', cs.cus_id);
            // get_rel_customers(cs.cus_id, cs.cut_id);
            get_rel_projects(cs.cus_id);
            clean_projects_field();

            $('#Customer i.clean')
                .unbind('click')
                .on('click', function () {
                    clean_customer_field();
                    clean_projects_field();
                });
        });
}
/** Relacion */
function select_relation() {
    caching_events('select_relation');
    $('#Relation .list_items li')
        .unbind('click')
        .on('click', function () {
            let idSel = $(this).parents('.dato');
            idSel.children('.grouper').html($(this).html());
            let pdrt = $(this).attr('id');
            let prnt = $('#Customer .grouper').attr('data_identy');

            get_rel_projects(pdrt.substring(1, pdrt.length), prnt);
            clean_projects_field();
            $('.list_items').slideUp(200);
            $('i').removeClass('rotar');
        });
}

/** Proyectos */
function selector_projects() {
    caching_events('selector_projects');
    $('#Projects .list_items ul li')
        .unbind('click')
        .on('click', function () {
            let status = $(this).attr('class');
            if (status == 'enable') {
                let idSel = $(this).parents('.dato');
                let indx = $(this).attr('data_content').split('|')[0];
                $('.list_items').slideUp(200);
                $('i').removeClass('rotar');
                let pj = proj[indx];
                $('#C' + pj.cus_id).trigger('click');
                // $('#R' + pj.cus_parent).trigger('click');
                idSel.children('.grouper').html('<i class="fas fa-times-circle clean"></i> ' + $(this).html());
                $('#LocationProject').html(pj.pjt_location);
                $('#TypeLocation').html(pj.loc_type_location);
                $('#DateProject').html(pj.pjt_date_project);
                $('#TypeProject').html(pj.pjttp_name);
                $('#PeriodProject').html(pj.pjt_date_start + ' - ' + pj.pjt_date_end);
                $('#numProject .search').html(pj.pjt_number);
                $('#IdProject').val(pj.pjt_id);
                $('#IdCuo').val(pj.cuo_id);
                $('#IdCus').val(pj.cus_id);
                $('#IdCusPrn').val(pj.cus_parent);

                get_budgets(pj.pjt_id);
                fill_dinamic_table();
                add_boton();

                $('#Projects i.clean')
                    .unbind('click')
                    .on('click', function () {
                        clean_projects_field();
                    });
            }
        });
}
/**  +++++   Arma el escenario de la cotizacion  */
function fill_dinamic_table() {
    caching_events('fill_dinamic_table');
    let H = `
    
    <table class="table_control" id="tblControl" style="width: 1310px;">
        <thead>
            <tr class="headrow">
                <th rowspan="2" class="w1 fix product">PRODUCTO</th>
                <th colspan="5" class="zone_01 headrow" >COSTO BASE</th>
                <th colspan="3" class="zone_02 headrow" >VIAJE</th>
                <th colspan="3" class="zone_03 headrow" >PRUEBAS</th>
            </tr>
            <tr>
                <th class="w2 zone_01" >Cantidad</th>
                <th class="w3 zone_01" >Precio</th>
                <th class="w2 zone_01 sel" ><i class="fas fa-caret-left" id="daybase"></i>Días</th>
                <th class="w2 zone_01 sel" ><i class="fas fa-caret-left" id="desbase"></i>Desc.</th>
                <th class="w3 zone_01" >Costo</th>
                <th class="w2 zone_02 sel" ><i class="fas fa-caret-left" id="daytrip"></i>Días</th>
                <th class="w2 zone_02 sel" ><i class="fas fa-caret-left" id="destrip"></i>Desc.</th>
                <th class="w3 zone_02" >Costo</th>
                <th class="w2 zone_03 sel" ><i class="fas fa-caret-left" id="daytest"></i>Días</th>
                <th class="w2 zone_03 sel" ><i class="fas fa-caret-left" id="destest"></i>Desc.</th>
                <th class="w3 zone_03" >Costo</th>
            </tr>
        </thead>
        <tbody>
            
        </tbody>
    </table>
    `;
    $('#tbl_dynamic').html(H);
    tbldynamic('tbl_dynamic');
    build_menu_control();

    $('#tblControl th i')
        .unbind('click')
        .on('click', function (e) {
            let idsel = $(this).attr('id');
            let x = e.pageX;
            let y = e.pageY;
            show_minimenues(idsel, x, y);
        });
}
/** ++++  Muestra las cuadros de opcion de dias y descuentos */
function show_minimenues(idsel, x, y) {
    let inic = idsel.substring(0, 3);
    let days = get_days_period();
    psy = y - 20;
    psx = x - 50;
    let H = '';

    let sll = '';
    switch (idsel.slice(0, 7)) {
        case 'daybase':
            sll = 3;
            break;
        case 'dscbase':
        case 'desbase':
            sll = 4;
            break;
        case 'daytrip':
            sll = 6;
            break;
        case 'dsctrip':
        case 'destrip':
            sll = 7;
            break;
        case 'daytest':
            sll = 9;
            break;
        case 'dsctest':
        case 'destest':
            sll = 10;
            break;
        default:
    }

    if (inic == 'day') {
        H = `
        <div class="box_days">
            <input type="text" id="txtdays" class="minitext">
        </div>
        `;

        $('body').append(H);
        $('.box_days').css({top: psy + 'px', left: psx + 'px'});

        $('.minitext').on('mouseout', function () {
            let dys = $('.minitext').val();
            console.log(idsel);
            dys = days_validator(dys, days, idsel);
            $('.' + idsel).text(dys);
            update_totals();
            $('.box_days').remove();
            updatesData(sll);
        });
    } else if (inic == 'dsc') {
        fill_discount(psy, psx);

        $('.box_desc li')
            .unbind('click')
            .on('click', function () {
                let ds = $(this).attr('data_content');
                $('.box_desc').remove();
                let desc = ds * 100;
                $('#' + idsel)
                    .parent()
                    .children('span')
                    .text(mkn(desc, 'p'));

                update_totals();
                updatesData(sll);
            });
    } else {
        fill_discount(psy, psx);

        $('.box_desc li')
            .unbind('click')
            .on('click', function () {
                let ds = $(this).attr('data_content');

                $('.box_desc').remove();
                let desc = ds * 100;
                $('.' + idsel)
                    .children('span')
                    .text(mkn(desc, 'p'));
                update_totals();
                updatesData(sll);
            });
    }
}
/**  ++++  Obtiene los días definidos para el proyectos */
function get_days_period() {
    let Period = $('#PeriodProject').text();
    let start = moment(Period.split(' - ')[0], 'DD/MM/YYYY');
    let end = moment(Period.split(' - ')[1], 'DD/MM/YYYY');
    let days = end.diff(start, 'days') + 1;

    return days;
}

/**   ++++++  Construye el menu de control */
function build_menu_control() {
    let H = `
        <ul class="menu_block">
            <li class="menu_button" id="printr"><i class="fas fa-print"></i> Imprimir</li>
        </ul>
        `;
    $('.menu_control').html(H);
    $('.menu_block').css({display: 'block'});
    $('.menu_button').on('click', function () {
        let acc = $(this).attr('id');
        switch (acc) {
            case 'mkproj':
                // alert('Convertir Cotizacion a proyecto');
                make_project();
                break;
            case 'printr':
                // alert('Imprimir proyecto');
                print_project();
                break;
            case 'expexl':
                alert('Exportar proyecto a Excel');
                break;
            case 'exppdf':
                alert('Exportar proyecto a PDF');
                break;
            default:
        }
    });
}

/** Limpiadores de campos */
/** Limpia proyectos */
function clean_projects_field() {
    caching_events('clean_projects_field');
    $('#Projects .grouper').html('');
    $('#LocationProject').html('');
    $('#PeriodProject').html('');
    $('#TypeLocation').html('');
    $('#DateProject').html('');
    $('#numProject .search').html('');
    $('#TypeProject').html('');
    $('#version').html('');
    $('#versions').html('');
    $('#IdProject').val('');
    $('#IdCus').val('');
    $('#IdCusPrn').val('');
    $('#IdCuo').val('');

    $('#Projects .list_items ul li').addClass('enable').removeClass('disable');
    $('#addBudget').removeClass('enable').addClass('disable');
    $('#tbl_dynamic').html('');
    $('.box_list_products').css({display: 'none'});
    hide_control_menu('none');
    $('#costbase').html(0);
    $('#costtrip').html(0);
    $('#costtest').html(0);
    $('#costassu').html(0);
    $('#total').html(0);
}
/** Limpia clientes */
function clean_customer_field() {
    caching_events('clean_customer_field');
    $('#Customer .grouper').html('');
    $('#Customer .grouper').attr('data_identy', '');
    $('#Relation .grouper').html('');
    $('#Relation').parent().children('.concepto').html('');
    $('#AddressProducer').html('');
    $('#EmailProducer').html('');
    $('#PhoneProducer').html('');
    $('#QualificationProducer').html('');
    $('#Customer .customerType').html('');
    $('#Projects .list_items ul li').addClass('enable').removeClass('disable');
}

/** Actualiza los totales */
function update_totals() {
    caching_events('update_totals');
    let costbase = 0,
        costtrip = 0,
        costtest = 0;
    costassu = 0;
    let total = 0;
    $('.frame_content #tblControl tbody tr').each(function (v) {
        let pid = $(this).attr('id');
        if ($(this).children('td.qtybase').html() != undefined) {
            qtybs = parseInt(pure_num($(this).children('td.qtybase').text()));
            prcbs = parseFloat(pure_num($(this).children('td.prcbase').text()));
            daybs = parseInt(pure_num($(this).children('td.daybase').text()));
            desbs = parseInt(pure_num($(this).children('td.desbase').text()));
            daytr = parseInt($(this).children('td.daytrip').text());
            destr = parseInt($(this).children('td.destrip').text());
            dayts = parseInt($(this).children('td.daytest').text());
            dests = parseInt($(this).children('td.destest').text());
            assur = parseFloat($(this).attr('data_insured'));

            stt01 = qtybs * prcbs; // Importe de cantidad x precio
            stt02 = stt01 * daybs; // Costo de Importe x días base
            stt03 = desbs / 100; // Porcentaje de descuento base
            stt04 = stt02 * stt03; // Costo de Importe x porcentaje descuento base
            cstbs = stt02 - stt04; // Costo base
            assre = stt01 * assur;

            stt05 = stt01 * daytr; // Costo de Importe x dias viaje
            stt06 = destr / 100; // Porcentaje de descuento viaje
            stt07 = stt05 * stt06; // Costo de Importe x porcentaje descuento viaje
            csttr = stt05 - stt07; // Costo viaje

            stt08 = stt01 * dayts; // Costo de Importe x dias prueba
            stt09 = dests / 100; // Porcentaje de descuento prueba
            stt10 = stt08 * stt09; // Costo de Importe x porcentaje prueba
            cstts = stt08 - stt10; // Costo prueba

            costbase += cstbs; // Total de Costo Base
            costtrip += csttr; // Total de Costo Viaje
            costtest += cstts; // Total de Costo Prueba
            costassu += assre; // Total de Seguro

            $('#' + pid)
                .children('td.costbase')
                .html(mkn(cstbs, 'n'));
            $('#' + pid)
                .children('td.costtrip')
                .html(mkn(csttr, 'n'));
            $('#' + pid)
                .children('td.costtest')
                .html(mkn(cstts, 'n'));
        }
    });
    total = costbase + costtrip + costtest + costassu;
    $('#costbase').html(mkn(costbase, 'n'));
    $('#costtrip').html(mkn(costtrip, 'n'));
    $('#costtest').html(mkn(costtest, 'n'));
    $('#costassu').html(mkn(costassu, 'n'));
    $('#total').html(mkn(total, 'n'));
}

/**  +++ Oculta los productos del listado que no cumplen con la cadena  */
function sel_items(res, sele) {
    if (res.length < 1) {
        $(`#${sele} .list_items ul li`).css({display: 'block'});
    } else {
        $(`#${sele} .list_items ul li`).css({display: 'none'});
    }

    $(`#${sele} .list_items ul li`).each(function (index) {
        var cm = $(this).text().toUpperCase();

        cm = omitirAcentos(cm);
        var cr = cm.indexOf(res);
        if (cr > -1) {
            //            alert($(this).children().html())
            $(this).css({display: 'block'});
        }
    });
}

/**  ++++++  Guarda la nueva version */
function save_version() {
    caching_events('save_version');
    let bdgSku = 0;
    let pjtId = $('#IdProject').val();
    let verCode = $('#version').text();
    $('.frame_content #tblControl tbody tr').each(function (v) {
        let tr = $(this);
        if (tr.attr('data_sku') != undefined) {
            bdgSku = 1;
        }
    });
    if (bdgSku == 1) {
        let par = `
        [{
            "pjtId"           : "${pjtId}",
            "verCode"         : "${verCode}"
        }]`;

        var pagina = 'ProjectDetails/SaveVersion';
        var tipo = 'html';
        var selector = save_budget;
        fillField(pagina, par, tipo, selector);
    }
}

/**  +++++++ Guarda la cotización    */
function save_budget(verId) {
    caching_events('save_budget');
    console.log('Guardando proyecto');

    $('.frame_content #tblControl tbody tr').each(function (v) {
        let tr = $(this);
        if (tr.attr('id') != undefined) {
            let prdId = tr.attr('id').substring(3, 10);
            let bdgSku = tr.attr('data_sku');
            let bdgProduct = tr.children('td.product').text();
            let bdgQuantity = tr.children('td.qtybase').text();
            let bdgPriceBase = tr.children('td.prcbase').text();
            let bdgDaysBase = tr.children('td.daybase').text();
            let bdgDesctBase = parseFloat(tr.children('td.desbase').text()) / 100;
            let bdgDayTrip = tr.children('td.daytrip').text();
            let bdgDesTrip = parseFloat(tr.children('td.destrip').text()) / 100;
            let bdgDayTest = tr.children('td.daytest').text();
            let bdgDesTest = parseFloat(tr.children('td.destest').text()) / 100;
            let bdgInsured = tr.attr('data_insured');
            let pjtId = $('#IdProject').val();

            if (bdgSku != undefined) {
                let par = `
                [{
                    "bdgSku"          : "${bdgSku}",
                    "bdgProduc"       : "${bdgProduct.replace(/\"/g, '°')}",
                    "bdgPricBs"       : "${bdgPriceBase}",
                    "bdgQtysBs"       : "${bdgQuantity}",
                    "bdgDaysBs"       : "${bdgDaysBase}",
                    "bdgDescBs"       : "${bdgDesctBase}",
                    "bdgDaysTp"       : "${bdgDayTrip}",
                    "bdgDescTp"       : "${bdgDesTrip}",
                    "bdgDaysTr"       : "${bdgDayTest}",
                    "bdgDescTr"       : "${bdgDesTest}",
                    "bdgInsured"      : "${bdgInsured}",
                    "verId"           : "${verId}",
                    "prdId"           : "${prdId}",
                    "pjtId"           : "${pjtId}"
                }]`;

                var pagina = 'ProjectDetails/SaveBudget';
                var tipo = 'html';
                var selector = resp_budget;
                fillField(pagina, par, tipo, selector);
            }
        }
    });
}

function resp_budget(dt) {
    caching_events('resp_budget');
    $('#P' + dt).trigger('click');
}

/**  +++++ Guarda el producto en la cotización +++++ */
function fill_budget(pr, ix) {
    caching_events('fill_budget');
    // console.log(pr);
    // console.log(ix);

    $('#Products .sel_product').text('');

    let insurance = pr.prd_insured == 0 ? 0 : 0.1;

    var par = `
    [{
        "prdSku"    : "${pr.prd_sku}",
        "prdName"   : "${pr.prd_name}",
        "prdPrice"  : "${pr.prd_price}",
        "prdId"     : "${pr.prd_id}",
        "prdInsur"  : "${insurance}",
        "indx"      : "${ix}"
    }]
    `;

    let nRows = $('.frame_content table tbody tr').length;

    load_budget(ix, nRows);
}

/**   ++++++  Arma los elementos para agregar ala cotización */
function load_budget(inx, bdgId) {
    caching_events('load_budget');

    let insurance = prod[inx].prd_insured == 0 ? 0 : 0.1;
    let produ = prod[inx].prd_name.replace(/\"/g, '°');
    let days = get_days_period();

    let par = `{
        "pjtcn_id"            : "${bdgId}",
        "pjtcn_prod_sku"      : "${prod[inx].prd_sku}",
        "pjtcn_prod_name"     : "${produ}",
        "pjtcn_prod_price"    : "${prod[inx].prd_price}",
        "pjtcn_quantity"      : "1",
        "pjtcn_days_base"     : "${days}",
        "pjtcn_discount_base" : "0",
        "pjtcn_days_trip"     : "0",
        "pjtcn_discount_trip" : "0",
        "pjtcn_days_test"     : "0",
        "pjtcn_discount_test" : "0",
        "pjtcn_insured"       : "${insurance}",
        "pjtcn_prod_level"    : "${prod[inx].prd_level}",
        "prd_id"              : "${prod[inx].prd_id}",
        "srv_id"              : "${prod[inx].srv_id}"
    }
    `;

    let ky = registered_product('bdg' + prod[inx].prd_id);
    if (ky == 0) {
        //fill_budget_prods(par, days, '2');
        add_new_product(par);
    }
}

function registered_product(id) {
    let ky = 0;
    $('.frame_content table tbody tr').each(function () {
        let idp = $(this).attr('id');
        if (id == idp) {
            console.log(id);
            let qty = parseInt($(this).children('td.qtybase').text()) + 1; // Nueva cantidad
            let pjtcnId = $(this).attr('data_project'); // Id de la linea del contenido del proyecto
            let prdId = id.substring(3, id.length); // Id del producto
            let level = $(this).attr('data_level'); // Tipo de producto
            let qtyAnt = parseInt($(this).children('td.qtybase').attr('qty_base')); // Cantidad Anterior
            $(this).children('td.qtybase').text(qty);
            update_totals();
            $('.sel_product').text('');
            $('.box_list_products').slideUp(200, function () {
                $('#Products .sel_product').trigger('keyup');
                $(`#Products .list_products ul`).html('');
            });
            ky = 1;
            // alert('incrementa uno la cantidad de productos ');
            updating_quantity($(this), qty, qtyAnt, 'NP');
        }
    });
    return ky;
}

/** ++++++ Llena la tabla de cotizaciones */
function fill_budget_prods(pd, days, st) {
    caching_events('fill_budget_prods');
    let pds = JSON.parse(pd);
    let sll = '';
    // console.log(pds);
    let prodName = pds.pjtcn_prod_name.toString().replace(/°/g, '"');
    let H = `
    <tr id="bdg${pds.prd_id}" class="bdg${pds.prd_id}" 
        data_sku="${pds.pjtcn_prod_sku}" 
        data_insured="${pds.pjtcn_insured}" 
        data_level="${pds.pjtcn_prod_level}" 
        data_project="${pds.pjtcn_id}" 
        data_service="${pds.srv_id}" 
    >
        <td class="w1 product"><i class="fas fa-ellipsis-v"></i>${prodName}<i class="fas fa-bars minimenu"></i></td>
        <td class="w2 zone_01 quantity qtybase editable" qty_base="${pds.pjtcn_quantity}">${pds.pjtcn_quantity}</td>
        <td class="w3 zone_01 price prcbase">${mkn(pds.pjtcn_prod_price, 'n')}</td>
        <td class="w2 zone_01 days daybase editable" >${pds.pjtcn_days_base}</td>
        <td class="w2 zone_01 desct desbase sel"><i class="fas fa-caret-left" id="dscbase${pds.prd_id}"></i><span>${mkn(pds.pjtcn_discount_base, 'n')}</span>%</td>
        <td class="w3 zone_01 cost costbase">0.00</td>
        <td class="w2 zone_02 days daytrip editable" >${pds.pjtcn_days_trip}</td>
        <td class="w2 zone_02 desct destrip sel"><i class="fas fa-caret-left" id="dsctrip${pds.prd_id}"></i><span>${mkn(pds.pjtcn_discount_trip, 'n')}</span>%</td>
        <td class="w3 zone_02 cost costtrip">0.00</td>
        <td class="w2 zone_03 days daytest editable" >${pds.pjtcn_days_test}</td>
        <td class="w2 zone_03 desct destest sel"><i class="fas fa-caret-left" id="dsctest${pds.prd_id}"></i><span>${mkn(pds.pjtcn_discount_test, 'n')}</span>%</td>
        <td class="w3 zone_03 cost costtest">0.00</td>
    </tr>
    `;
    $('.table_control tbody tr:last-child').before(H);

    editable_disable('tbl_dynamic');

    $('.editable')
        .unbind('click')
        .on('click', function () {
            $(this).attr('contenteditable', true).trigger('focus');
        });

    $('.sel_product').text('');
    $('.box_list_products').slideUp(200, function () {
        $('#Products .sel_product').trigger('keyup');
        $(`#Products .list_products ul`).html('');
    });

    let nRows = $('.frame_content table tbody tr').length;
    if (nRows > 1) {
        $('#addBudget').removeClass('disable').addClass('enable');
    }

    $('#tblControl td i')
        .unbind('click')
        .on('click', function (e) {
            let idsel = $(this).attr('id');
            let x = e.pageX;
            let y = e.pageY;

            show_minimenues(idsel, x, y);
        });

    update_totals();

    $('.quantity')
        .unbind('blur')
        .on('blur', function () {
            hide_control_menu('none');

            let qtyPrev = $(this)[0].attributes[1].value;
            let qtyCurr = $(this)[0].outerText;
            let rw = $(this).parent();
            let qtytot = qtyCurr < 1 ? 1 : qtyCurr;
            $(this)[0].innerHTML = qtytot;

            updating_quantity(rw, qtytot, qtyPrev, 'IN');
            update_totals();
            $(this).attr('contenteditable', false);
        });
    $('.days')
        .unbind('blur')
        .on('blur', function () {
            hide_control_menu('none');
            let dy = $(this).attr('class');
            if (dy.indexOf('daybase') >= 0) {
                let dys = $(this).text();
                let sel = 'daybase';
                dys = days_validator(dys, days, sel);
                $(this).text(dys);
                sll = 3;
            } else if (dy.indexOf('daytrip') >= 0) {
                let dys = $(this).text();
                let sel = 'daytrip';
                dys = days_validator(dys, days, sel);
                $(this).text(dys);
                sll = 6;
            } else if (dy.indexOf('daytest') >= 0) {
                let dys = $(this).text();
                let sel = 'daytest';
                dys = days_validator(dys, days, sel);
                $(this).text(dys);
                sll = 9;
            }

            updatesData(sll);
            update_totals();
        });

    $('.minimenu')
        .unbind('click')
        .on('click', function () {
            let id = $(this).parents('tr');
            let posLeft = id.offset().left;
            let posTop = id.offset().top;
            let prdId = id.attr('id').substring(3, 10);
            let prdLvl = id.attr('data_level');
            let pjtcn = id.attr('data_project');
            $('.box_minimenu')
                .css({top: posTop - 35 + 'px', left: posLeft + 320 + 'px'})
                .fadeIn(400);

            var H = `
            <li data_content="${prdId}" data_project="${pjtcn}" class="mini_option killProd"><i class="fas fa-trash"></i> Eliminar</li>
            <li data_content="${prdId}" data_project="${pjtcn}" data_level="${prdLvl}" class="mini_option infoProd"><i class="fas fa-info-circle"></i> Información</li>
                `;
            $('.list_menu ul').html(H);

            $('.box_minimenu')
                .unbind('mouseleave')
                .on('mouseleave', function () {
                    $(this).fadeOut(200);
                });

            $('.mini_option')
                .unbind('click')
                .on('click', function () {
                    let option = $(this).attr('class').split(' ')[1];
                    let prdId = $(this).attr('data_content');
                    let prdLvl = $(this).attr('data_level');
                    let pjtcn = $(this).attr('data_project');
                    let blkSts = $('.menu_block').css('display');

                    switch (option) {
                        case 'killProd':
                            hide_control_menu('none');
                            let rsp = confirm('¿Realmente requieres de eliminar este producto?');
                            if (rsp) {
                                kill_product(prdId);
                            }
                            break;
                        case 'infoProd':
                            show_info_product(prdId, prdLvl, pjtcn);
                            break;
                        default:
                    }
                });
        });
}

function kill_product(id) {
    killProductBase(id);
    $('.bdg' + id).fadeOut(500, function () {
        update_totals();
        $('.bdg' + id).remove();
    });
}

function show_info_product(id, lvl, pj) {
    caching_events('add_client');
    $('.box_modal_deep').css({display: 'flex'});
    $('.box_modal').animate(
        {
            top: '70px',
        },
        500
    );

    let H = `
        <div class="row">
            <div class="form col-sm-12 col-md-12 col-lg-9 col-xl-9 qst">
                <div class="product_container">
                    <h2>Nombre del producto<br><small><small>Producto</small></small></h2>
                    <table>
                        <tr>
                            <th>SKU</th>
                            <th>PRODUCTO</th>
                        </tr>
                        
                    </table>
                    <div class="space_end"></div>
                </div>
                <div class="fix_buttons">
                    <button class="bn btn-cn">Cerrar</button>
                </div>
            </div>
            <div class="form col-sm-12 col-md-12 col-lg-3 col-xl-3 image img01"></div>
        </div>
    `;
    $('.box_modal').html(H);
    get_products_related(id, lvl, pj);

    $('.btn-cn').on('click', function () {
        close_modal();
    });
}
/**  Llena el listado de relacionados al prducto */
function put_products_related(dt) {
    let name = dt[0].prd_name;
    $('.product_container h2').html(name);

    $.each(dt, function (v, u) {
        let cls = u.prd_level == 'P' ? 'blk' : '';
        let typ = u.prd_level == 'A' ? 'dep' : '';
        let sku = '';
        let pnd = '';
        if (u.pjtdt_prod_sku == 'Pendiente') {
            pnd = 'pnd';
            sku = u.pjtdt_prod_sku;
        } else {
            pnd = '';
            sku = u.pjtdt_prod_sku.slice(0, 7) + '-' + u.pjtdt_prod_sku.slice(7, 11);
            sku = u.pjtdt_prod_sku.slice(11, 15) != '' ? sku + '-' + u.pjtdt_prod_sku.slice(11, 15) : sku;
        }
        let H = `
        <tr>
            <td class="pdd_sku ${cls} ${pnd}">${sku}</td>
            <td class="pdd_nam ${cls} ${pnd} ${typ}">${u.prd_name}</td>
        </tr>
        `;
        $('.product_container table').append(H);
    });
}

/** ++++ Oculta el menu de control */
function hide_control_menu(prm) {
    $('.menu_block').css({display: prm});
}

/**  Agrega nuevo cliente */
function add_client() {
    caching_events('add_client');
    $('.box_modal_deep').css({display: 'flex'});
    $('.box_modal').animate(
        {
            top: '70px',
        },
        500
    );

    let H = `
        <div class="row">
            <div class="form col-sm-12 col-md-12 col-lg-8 col-xl-8 qst">
                
                <div class="form_group">
                    <label for="txtCustomerName">Nombre del cliente:</label>
                    <input type="text" id="txtCustomerName" name="txtCustomerName" class="textbox">
                </div>

                <div class="form_group">
                    <label for="txtCustomerType">Tipo de cliente:</label>
                    <div class="subgroup">
                    Casa Productora<span id="t1"> <i class="far fa-circle tt"></i></span>Productor<span id="t2"><i class="far fa-circle tt"></i></span>
                    </div>
                </div>

                <div class="form_group">
                    <label for="txtCustomerContact">Nombre del contacto:</label>
                    <input type="text" id="txtCustomerContact" name="txtCustomerContact"  class="textbox">
                </div>

                <div class="form_group">
                    <label for="txtCustomerAddress">Domicilio:</label>
                    <input type="text" id="txtCustomerAddress" name="txtCustomerAddress"  class="textbox">
                </div>

                <div class="form_group">
                    <label for="txtCustomerMail">Correo electrónico:</label>
                    <input type="text" id="txtCustomerMail" name="txtCustomerMail"  class="textbox">
                </div>

                <div class="form_group">
                    <label for="txtCustomerPhone">Teléfono:</label>
                    <input type="text" id="txtCustomerPhone" name="txtCustomerPhone"  class="textbox">
                </div>

                    <button class="bn btn-ok" id="saveCostumer">agregar cliente</button>
                    <button class="bn btn-cn">Cancelar</button>
            </div>
            <div class="form col-sm-12 col-md-12 col-lg-4 col-xl-4 image img01"></div>
        </div>
    `;
    $('.box_modal').html(H);

    $('.tt').on('click', function () {
        let typeCus = $(this).parent('span').attr('id');
        $('.tt').removeClass('fas').addClass('far');
        $(this).removeClass('far').addClass('fas');
    });

    $('#saveCostumer').on('click', function () {
        save_costumer();
    });

    $('.btn-cn').on('click', function () {
        close_modal();
    });
}

/**  Coloca los datos del cliente del formulario en la cotización */
function save_costumer() {
    caching_events('save_costumer');
    let CustomerName = $('#txtCustomerName').val();
    let CustomerContact = $('#txtCustomerContact').val();
    let CustomerAddress = $('#txtCustomerAddress').val();
    let CustomerMail = $('#txtCustomerMail').val();
    let CustomerPhone = $('#txtCustomerPhone').val();
    let CustomerId = $('.tt.fas').parent().attr('id').substring(1, 2);

    $('#Customer').text(CustomerName);
    $('#AddressProducer').text(CustomerAddress);
    $('#EmailProducer').text(CustomerMail);
    $('#PhoneProducer').text(CustomerPhone);

    var par = `
        [{
            "cus_name"      : "${CustomerName}",
            "cus_contact"   : "${CustomerContact}",
            "cus_address"   : "${CustomerAddress}",
            "cus_email"     : "${CustomerMail}",
            "cus_phone"     : "${CustomerPhone}",
            "cus_id"        : "${CustomerId}"
        }]`;
    console.log(par);

    close_modal();
}

/**  Agrega nuevo proyecto */
function add_project() {
    caching_events('add_project');
    $('.box_modal_deep').css({display: 'flex'});
    $('.box_modal').animate(
        {
            top: '70px',
        },
        500
    );
    clean_projects_field();
    clean_customer_field();

    let H = `
    <div class="row">
        <div class="form col-sm-12 col-md-12 col-lg-8 col-xl-8 qst">
            <div class="form_group">
                <label for="txtProject">Nombre del proyecto:</label>
                <input type="text" id="txtProject" name="txtProject"  class="textbox"><br>
                <span class="alert"></span>
            </div>

            <div class="form_group" id="reportrange">
                <label for="txtPeriodProject">Periodo:</label><br>
                <input type="text" id="txtPeriodProject"  name="txtPeriodProject" class="textbox">
                <i class="fas fa-calendar-alt"></i><br>
                <span class="alert"></span>
            </div>

            <div class="form_group">
                <label for="txtLocation">Locación:</label>
                <input type="text" id="txtLocation" name="txtLocation"  class="textbox">
            </div>

            <div class="form_group">
                <label for="txtTypeProject">Tipo de proyecto:</label>
                <select id="txtTypeProject" name="txtTypeProject" class="form-select" >
                    <option value="0"> Selecciona un tipo de proyecto</option>
                </select>
                <span class="alert"></span>
            </div>

            <div class="form_group">
                <label for="txtTypeLocation">Tipo de locación:</label>
                <select id="txtTypeLocation" name="txtTypeLocation" class="form-select" >
                    <option value="1"> Local</option>
                    <option value="2"> Foraneo</option>
                </select>
            </div>

            <div class="form_group">
                <label for="txtCustomer">Cliente:</label>
                <select id="txtCustomer" class="form-select">
                    <option value="0"> Ninguno</option>
                </select>
                <span class="alert"></span>
            </div>

            <div class="form_group">
                <label for="txtCustomerRel">Relación:</label>
                <select id="txtCustomerRel" class="form-select">
                    <option value="0"> Ninguno</option>
                </select>
                <span class="alert"></span>
            </div>
            <div class="space_end"></div>

            <div class="fix_buttons">
                <button class="bn btn-ok" id="saveProject">agregar proyecto</button>
                <button class="bn btn-cn">Cancelar</button>
            </div>
        </div>
        <div class="form col-sm-12 col-md-12 col-lg-4 col-xl-4 image img02"></div>
    </div>
`;

    $('.box_modal').html(H);

    load_project_type();

    let fecha = moment(Date()).format('DD/MM/YYYY');

    $('#reportrange').daterangepicker(
        {
            autoApply: true,
            locale: {
                format: 'DD/MM/YYYY',
                separator: ' - ',
                applyLabel: 'Apply',
                cancelLabel: 'Cancel',
                fromLabel: 'From',
                toLabel: 'To',
                customRangeLabel: 'Custom',
                weekLabel: 'W',
                daysOfWeek: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'],
                monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
                firstDay: 1,
            },
            showCustomRangeLabel: false,
            startDate: fecha,
            endDate: fecha,
            minDate: fecha,
            opens: 'right',
        },
        function (start, end, label) {
            $('#txtPeriodProject').val(start.format('DD/MM/YYYY') + ' - ' + end.format('DD/MM/YYYY'));
            $('#txtPeriodProject').parent().children('span').html('');
            // console.log('New date range selected: ' + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD') + ' (predefined range: ' + label + ')');
        }
    );

    $.each(cust, function (v, u) {
        let H = `<option value="${u.cus_id}"> ${u.cus_name}</option>`;
        $('#txtCustomer').append(H);
        $('#txtCustomerRel').append(H);
    });

    $('#saveProject').on('click', function () {
        let ky = 0;

        if ($('#txtProject').val() == '') {
            ky = 1;
            $('#txtProject').parent().children('span').html('Debes agregar Nombre del proyecto');
        }
        if ($('#txtPeriodProject').val() == '') {
            ky = 1;
            $('#txtPeriodProject').parent().children('span').html('Debes agregar las fechas del projecto');
        }
        console.log($('#txtTypeProject option:selected').val());
        if ($('#txtTypeProject option:selected').val() == '0') {
            ky = 1;
            $('#txtTypeProject').parent().children('span').html('Debes seleccionar el tipo de projecto');
        }
        if ($('#txtCustomer option:selected').val() == '0') {
            ky = 1;
            $('#txtCustomer').parent().children('span').html('Debes seleccionar un cliente');
        }

        if (ky == 0) {
            save_project();
        }
    });

    $('.textbox').on('focus', function () {
        $(this).parent().children('span').html('');
    });

    $('#txtCustomer').on('change', function () {
        $('#txtCustomer').parent().children('span').html('');
        $('#txtCustomerRel option').show();
        let cte = $('#txtCustomer option:selected').val();
        $('#txtCustomerRel option[value="' + cte + '"]').hide();
    });

    $('.btn-cn').on('click', function () {
        close_modal();
    });
}

/**  Coloca los datos del proyecto del formulario en la cotización */
function save_project() {
    caching_events('save_project');
    let projName = $('#txtProject').val();
    let projLocation = $('#txtLocation').val();
    let projLocationTypeValue = $('#txtTypeLocation option:selected').val();
    let projLocationTypeText = $('#txtTypeLocation option:selected').text();
    let projPeriod = $('#txtPeriodProject').val();
    let projType = $('#txtTypeProject option:selected').val();
    let cusCte = $('#txtCustomer option:selected').val();
    let cusCteRel = $('#txtCustomerRel option:selected').val();

    let projDateStart = moment(projPeriod.split(' - ')[0], 'DD/MM/YYYY').format('YYYYMMDD');
    let projDateEnd = moment(projPeriod.split(' - ')[1], 'DD/MM/YYYY').format('YYYYMMDD');

    let cuoId = 0;
    $.each(relc, function (v, u) {
        if (cusCte == u.cus_id && cusCteRel == u.cus_parent) {
            cuoId = u.cuo_id;
        }
    });

    let par = `
    [{
        "pjtName"       : "${projName}",
        "pjtLocation"   : "${projLocation}",
        "pjtDateStart"  : "${projDateStart}",
        "pjtDateEnd"    : "${projDateEnd}",
        "pjtType"       : "${projType}",
        "locId"         : "${projLocationTypeValue}",
        "cuoId"         : "${cuoId}",
        "cusId"         : "${cusCte}",
        "cusParent"     : "${cusCteRel}"
    }]
    `;

    console.log(par);

    $('#version').html('C0001');
    close_modal();

    $('#Projects i.clean')
        .unbind('click')
        .on('click', function () {
            clean_projects_field();
        });

    var pagina = 'ProjectDetails/SaveProject';
    var tipo = 'html';
    var selector = load_project;
    fillField(pagina, par, tipo, selector);
}

/**  ++++++ Inicia la carga de proyectos */
function load_project(dt) {
    caching_events('load_project');
    $('#Projects .list_items ul').html('');
    get_projects();

    setTimeout(() => {
        $('#P' + dt).trigger('click');
    }, 2000);
}

/**  Cierra la ventana del modal */
function close_modal() {
    caching_events('close_modal');
    $('.box_modal').animate(
        {
            top: '120%',
        },
        500,
        function () {
            $('.box_modal_deep').css({display: 'none'});
        }
    );
}

/** ++++++ Selecciona los productos del listado */
function sel_product(res, sele) {
    if (res.length > 3) {
        $(`#${sele} .list_products ul`).html('');
        let dstrO = $('#PeriodProject').text().split(' - ')[0];
        let dendO = $('#PeriodProject').text().split(' - ')[1];
        let dstr = moment(dstrO, 'DD/MM/YYYY').format('YYYY-MM-DD');
        let dend = moment(dendO, 'DD/MM/YYYY').format('YYYY-MM-DD');
        get_products(res, dstr, dend);
        $('.list_products').css({display: 'block'});
    } else {
        $(`#Products .list_products ul`).html('');
        $(`.list_products`).css({display: 'none'});
    }
}

/**  ++++ Omite acentos para su facil consulta */
function omitirAcentos(text) {
    var acentos = 'ÃÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛãàáäâèéëêìíïîòóöôùúüûÑñÇç';
    var original = 'AAAAAEEEEIIIIOOOOUUUUaaaaaeeeeiiiioooouuuunncc';
    for (var i = 0; i < acentos.length; i++) {
        text = text.replace(acentos.charAt(i), original.charAt(i));
    }
    return text;
}

/**  Muestra el menu de descuentos */
function fill_discount(psy, psx) {
    let H = `
        <div class="box_desc">
            <ul></ul>
        </div>
    `;
    $('body').append(H);
    $.each(disc, function (v, u) {
        H = `<li data_content="${u.dis_discount}">${u.dis_name}</li>`;
        $('.box_desc ul').append(H);
    });

    $('.box_desc').css({top: psy - 20 + 'px', left: psx - 30 + 'px'});

    $('.box_desc').on('mouseleave', function () {
        $(this).remove();
    });
}

/**  Valida los parametros de días */
function days_validator(dys, days, idsel) {
    if (dys != '') {
        if (idsel == 'daybase') {
            if (dys > days) {
                alert('El numero de días no puede ser mayor \nal periodo definido para el proyecto.');
                dys = days;
            }
        } else if (idsel == 'daytrip') {
            let mod = dys % 2;
            if (mod != 0 || dys > 6) {
                alert('El numero de días debe ser par y no mayor a 6 días.');
                dys = 0;
            }
        } else if (idsel == 'daytest') {
            if (dys > 5) {
                alert('El numero de días debe ser mayor a 5 días.');
                dys = 5;
            }
        }
        // $('.' + idsel).text(dys);
        return dys;
    }
}

function mkn(cf, tp) {
    let nm = cf;
    switch (tp) {
        case 'n':
            nm = formato_numero(cf, '2', '.', ',');
            break;
        case 'p':
            nm = formato_numero(cf, '1', '.', ',');
            break;
        default:
    }
    return nm;
}

function make_project() {
    let projectId = $('#IdProject').val();
    let versionId = $('.menu_version').attr('data_content');
    console.log(projectId, versionId);
}

function print_project() {
    let projectId = $('#IdProject').val();
    console.log(projectId);
    var pagina = 'ProjectDetails/saveProjectList';
    var par = `[{"pjtId":"${projectId}"}]`;
    var tipo = 'html';
    var selector = printProject;
    fillField(pagina, par, tipo, selector);
}

function printProject(dt) {
    console.log(dt);
    let usr = dt.split('|')[0];
    let nme = dt.split('|')[1];
    window.open(url + 'app/views/ProjectDetails/ProjectDetailsReport.php?u=' + usr + '&n=' + nme, '_blank');
}

/**  +++++ Cachando eventos   */
function caching_events(ev) {
    // console.log(ev);
}

/**  ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++  */
/**  +++++ PROCESO DE MOVIMIENTOS EN EL PROYECTO                                 */
/**  ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++  */

/* ++++ Modificación de la cantidad  ++++ */
function updating_quantity(rw, qn, qa, ac) {
    console.log(rw);

    qn = qn < 1 ? 1 : qn;

    let qtycll = rw[0].cells[1].attributes[1];

    let pjtcnid = rw[0].attributes[5].value;
    let pjtserv = rw[0].attributes[6].value;
    let produid = rw[0].attributes[0].value.substring(3, 100);
    let prdlevl = rw[0].attributes[4].value;
    let pjtcqty = qn;
    let dytritt = daytrip / 2;
    let daysini = dytritt + daytest;
    let daysfnl = dytritt + daybase;
    let prjDStr = moment(proj[0].pjt_date_start, 'DD/MM/YYYY').subtract('days', daysini).format('YYYYMMDD');
    let prjDEnd = moment(proj[0].pjt_date_end, 'DD/MM/YYYY').add('days', daysfnl).format('YYYYMMDD');

    pjtcqty = 1;
    let par = `[{
        "pjtcn_id"          : "${pjtcnid}",
        "prd_id"            : "${produid}",
        "pjtcn_quantity"    : "${pjtcqty}",
        "srv_id"            : "${pjtserv}",
        "serReserveStart"   : "${prjDStr}",
        "serReserveEnd"     : "${prjDEnd}",
        "level"             : "${prdlevl}"
    }]
    `;

    if (ac == 'NP') {
        sequenceIncreaseQty(par);
        qtycll.value = qn;
    } else if (ac == 'IN') {
        if (qn > qa) {
            let qtyant = rw[0].cells[1].attributes[1].value;
            let qtynew = rw[0].cells[1].outerText;
            let qtytot = qtynew - qtyant;

            for (var i = 1; i <= qtytot; i++) {
                sequenceIncreaseQty(par);
            }
            qtycll.value = qn;
        } else if (qn < qa) {
            let qtyant = rw[0].cells[1].attributes[1].value;
            let qtynew = rw[0].cells[1].outerText;
            let qtytot = qtyant - qtynew;
            // console.log('disminuye cantidad');
            for (var i = 1; i <= qtytot; i++) {
                let rem = parseInt(qtyant) + 1 - i;
                sequenceDecreaseQty(pjtcnid, rem);
            }
            qtycll.value = qn;
        }
    }
}

// secuencia de incremento en la cantidad de productos
function sequenceIncreaseQty(par) {
    var pagina = 'ProjectDetails/increaseQuantity';
    var tipo = 'html';
    var selector = show_increase_quantity;
    caching_events('updating_quantity-increase');
    fillField(pagina, par, tipo, selector);
}

function show_increase_quantity(dt) {
    console.log(dt);
}

// secuencia de disminucion en la cantidad de productos
function sequenceDecreaseQty(pjtcnid, rem) {
    console.log(pjtcnid, rem);
    var pagina = 'ProjectDetails/decreaseQuantity';
    let par = `[{"pjtcnid":"${pjtcnid}","pos":"${rem}"}]`;
    var tipo = 'html';
    var selector = show_decrease_quantity;
    caching_events('updating_quantity-decrease');
    fillField(pagina, par, tipo, selector);
}

function show_decrease_quantity(dt) {
    console.log(dt);
}

function killProductBase(id) {
    let rw = $('#bdg' + id);
    let qty = rw[0].cells[1].outerText;
    let pjtcnid = rw[0].attributes[5].value;
    for (var i = 1; i <= qty; i++) {
        let qt = parseInt(qty) + 1 - i;
        sequenceDecreaseQty(pjtcnid, qt);
        console.log(pjtcnid, qt);
    }

    var pagina = 'ProjectDetails/killProduct';
    let par = `[{"pjtcnid":"${pjtcnid}"}]`;
    var tipo = 'html';
    var selector = show_killProductBase;
    caching_events('updating_quantity-decrease');
    fillField(pagina, par, tipo, selector);
}

function show_killProductBase(dt) {
    console.log(dt);
}

/* ++++ Agregar producto nuevo  ++++ ++++ */
function add_new_product(pd) {
    let pds = JSON.parse(pd);
    let pjtcsku = pds.pjtcn_prod_sku;
    let pjtcnnm = pds.pjtcn_prod_name;
    let pjprice = parseFloat(pds.pjtcn_prod_price.replace(/,/g, ''));
    let pjtcqty = parseInt(pds.pjtcn_quantity);
    let daybase = parseInt(pds.pjtcn_days_base);
    let dscbase = parseFloat(pds.pjtcn_discount_base);
    let daytrip = parseInt(pds.pjtcn_days_trip);
    let dsctrip = parseFloat(pds.pjtcn_discount_trip);
    let daytest = parseInt(pds.pjtcn_days_test);
    let dsctest = parseFloat(pds.pjtcn_discount_test);
    let pjtinsr = pds.pjtcn_insured;
    let prodlvl = pds.pjtcn_prod_level;
    let prodsrv = pds.srv_id;
    let produid = pds.prd_id;
    let prjetid = proj[0].pjt_id;

    let dytritt = daytrip / 2;
    let daysini = dytritt + daytest;
    let daysfnl = dytritt + daybase;

    let prjDStr = moment(proj[0].pjt_date_start, 'DD/MM/YYYY').subtract('days', daysini).format('YYYYMMDD');
    let prjDEnd = moment(proj[0].pjt_date_end, 'DD/MM/YYYY').add('days', daysfnl).format('YYYYMMDD');

    let par = `[{
        "pjtId"                 : "${prjetid}",
        "pjtcnProdSku"          : "${pjtcsku}",
        "pjtcnProdName"         : "${pjtcnnm}",
        "pjtcnProdPrice"        : "${pjprice}",
        "pjtcnQuantity"         : "${pjtcqty}",
        "pjtcnDaysBase"         : "${daybase}",
        "pjtcnDiscountBase"     : "${dscbase}",
        "pjtcnDaysTrip"         : "${daytrip}",
        "pjtcnDiscountTrip"     : "${dsctrip}",
        "pjtcnDaysTest"         : "${daytest}",
        "pjtcnDiscountTest"     : "${dsctest}",
        "pjtcnInsured"          : "${pjtinsr}",
        "pjtcnProdLevel"        : "${prodlvl}",
        "prdId"                 : "${produid}",
        "srvId"                 : "${prodsrv}",
        "serReserveStart"       : "${prjDStr}",
        "serReserveEnd"         : "${prjDEnd}"
    }]
    `;
    var pagina = 'ProjectDetails/addNewProduct';
    var tipo = 'json';
    var selector = shownewproducts;
    caching_events('add_new_product');
    fillField(pagina, par, tipo, selector);
}

function shownewproducts(dt) {
    let days = get_days_period();

    if (dt[0].pjtcn_id > 0) {
        $.each(dt, function (v, u) {
            let jsn = JSON.stringify(u);
            fill_budget_prods(jsn, days, '1');
        });
    }
}

function updatesData(sl) {
    let rw = $('.frame_content .table_control tbody');
    let rws = rw[0].rows.length - 1;

    for (var i = 0; i < rws; i++) {
        let pjtcnId = rw[0].rows[i].attributes[5].value;
        let pjtdata = rw[0].rows[i].cells[sl].outerText;

        var pagina = 'ProjectDetails/updateData';
        var par = `[{"pjtcnId":"${pjtcnId}", "data":"${pjtdata}", "field":"${sl}"}]`;
        var tipo = 'json';
        var selector = show_updatesData;
        caching_events('get_customers');
        fillField(pagina, par, tipo, selector);
    }
}

function show_updatesData(dt) {
    console.log(dt);
}
