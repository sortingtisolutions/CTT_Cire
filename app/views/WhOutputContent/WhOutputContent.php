<?php
    defined('BASEPATH') or exit('No se permite acceso directo');
    require ROOT . FOLDER_PATH . "/app/assets/header.php";
?>

<header>
    <?php require ROOT . FOLDER_PATH . "/app/assets/menu.php"; ?>

</header>
<!-- CUERPO DE LA PAGINA -->
<div class="container-fluid">
    <div class="contenido">

        <div class="row mvst_group">
            <div class="mvst_panel" style="width:280px; background-color: #e2e8f8">
                <div class="form-group">
                <div class="form_primary">
                    
                    <h4 class="mainTitle">Datos de los Proyectos</h4>
						<div class="row">
                            <div class="col-md-12 col-lg-12 col-xl-12 mb-2 form-floating">
                                <input id="txtProjectName" type="text" class="form-control form-control-sm" style="background-color: #FFFAFF" disabled>
                                <label for="txtProjectName">Nombre del Proyecto</label>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12 col-lg-12 col-xl-12 mb-2 form-floating">
                                <input id="txtProjectNum" type="text" class="form-control form-control-sm" style="background-color: #FFFAFF" disabled >
                                <label for="txtProjectNum">Numero Proyecto</label>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12 col-lg-12 col-xl-12 mb-2 form-floating">
                                <input id="txtTipoProject" type="text" class="form-control form-control-sm" style="background-color: #FFFAFF" disabled>
                                <label for="txtTipoProject">Tipo de Proyecto</label>
                            </div>
                        </div>
						<div class="row">
							<div class="col-md-6 col-lg-6 col-xl-6 mb-2 form-floating">
								<input id="txtStartDate" type="text" class="form-control form-control-sm" style="background-color: #FFFAFF" disabled>
								<label for="txtStartDate" >Fecha Incial</label>
							</div>
							<div class="col-md-6 col-lg-6 col-xl-6 mb-2 form-floating">
								<input id="txtEndDate" type="text" class="form-control form-control-sm" style="background-color: #FFFAFF" disabled>
								<label for="txtEndDate">Fecha Final</label>
							</div>
						</div>
						<div class="row">
                            <div class="col-md-12 col-lg-12 col-xl-12 mb-2 form-floating">
                                <input id="txtLocation" type="text" class="form-control form-control-sm" style="background-color: #FFFAFF" disabled>
                                <label for="txtLocation">Dirección de Locación</label>
                            </div>
                        </div>
						<div class="row">
                            <div class="col-md-12 col-lg-12 col-xl-12 mb-2 form-floating">
                                <input id="txtCustomer" type="text" class="form-control form-control-sm" style="background-color: #FFFAFF" disabled>
                                <label for="txtCustomer">Nombre Cliente</label>
                            </div>
                        </div>
						<div class="row">
                            <div class="col-md-12 col-lg-12 col-xl-12 mb-2 form-floating">
                                <input id="txtAnalyst" type="text" class="form-control form-control-sm" style="background-color: #FFFAFF" disabled>
                                <label for="txtAnalyst">Analista de Programación</label>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12 col-lg-12 col-xl-12 mb-2 form-floating">
                                <select id="txtFreelance" class="form-select form-select-sm"><option value='0'></option></select>
                                <label for="txtFreelance">Freelances Asignados</label>
                            </div>
                        </div>
						<!-- <div class="row">
                            <div class="col-md-12 col-lg-12 col-xl-12 mb-2 form-floating">
                                <input id="txtFreelance" type="text" class="form-control form-control-sm" >
                                <label for="txtFreelance">Freelance Asignado</label>
                            </div>
                        </div> -->
                        <div class="row">
                            <div class="col-md-12 col-lg-12 col-xl-12 mb-2 form-floating">
                                <textarea class="form-control form-control-sm" id="txtComments" style="height:70px; background-color: #FFFAFF" autocomplete="off" rows="5" disabled></textarea>
                                <label for="txtComments">Comentarios de Programación</label>
                            </div>
                        </div>
                    </div>
                    <div style="height:10px;"></div> <!-- Agregar un espacio -->

                    <!-- BOTON PARA REGISTRAR LA SALIDA -->
                    <!-- <div class="row">
                            <div class="col">
                                <button type="button"  class="btn btn-primary btn-sm btn-block" style="font-size: 0.8rem !important;" id="printdetails">Imprime Detalles</button>
                            </div>
                    </div> -->


                    <div style="height:10px;"></div> <!-- Agregar un espacio -->
                    <!-- BOTON PARA IMPRIMIR DETALLE -->
                    <div class="row">
                            <div class="col">
                                <button type="button"  class="btn btn-primary btn-sm btn-block" style="font-size: 0.8rem !important;" id="recordOutPut">Registrar Salida</button>
                            </div>
                            <!-- <div class="col-6">
                                <button type="button"  class="btn btn-danger btn-sm btn-block" style="font-size: 1rem !important;" id="LimpiarFormulario">Limpiar</button>
                            </div> -->
                    </div>
                    <div style="height:15px;"></div> <!-- Agregar un espacio -->
                    <!-- BOTON PARA IMPRIMIR  -->
                    <div class="row bprint hide-items">
                            <div class="col">
                                <button type="button"  class="btn btn-primary btn-sm btn-block" style="font-size: 0.8rem !important; color:lightsalmon" id="printOutPut">Imprimir Salida</button>
                            </div>
                    </div>

                    <div class="form_secundary">
                        <h4>Seleccion de productos</h4>
                        <div class="row">
                            <input type="hidden" id="txtIdPackages" name="txtIdPackages"><br>
                            <div class="col-md-12 col-lg-12 col-xl-12 mb-2 form-floating">
                                <select id="txtCategoryProduct" class="form-select form-select-sm required">
                                    <option value="0" data-content="||||" selected>Selecciona una categoría</option>
                                </select>
                                <label for="txtCategoryProduct">Categoria</label>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12 col-lg-12 col-xl-12 mb-2 form-floating">
                                <select id="txtSubcategoryProduct" class="form-select form-select-sm required">
                                    <option value="0" selected>Selecciona una subcategoría</option>
                                </select>
                                <label for="txtSubcategoryProduct" class="form-label">Subcategoia</label>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>

<!-- Tabla para presentar los contenidos del proyecto -->
            <div class="mvst_table">
                <div class="mvst_list tblProdMaster">
                        <h1>Asignacion de Productos</h1>
                        <table class="display compact nowrap"  id="tblAsignedProd" style="width:95%">
                            <thead>
                                <tr>
                                    <th style="width:  20px"></th>
                                    <th style="width:  60px">SKU</th>
                                    <th style="width:  auto">Descripcion</th>
									<th style="width:  60px">Cantidad</th>
                                    <th style="width:  60px">Equipo</th>
                                    <th style="width:  30px">Tipo</th>
                                </tr>
                            </thead>
                            <tbody></tbody>
                        </table>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- Start Ventana modal de SERIES seleccionadas del producto MODAL 1 -->
<div class="overlay_background overlay_hide" id="SerieModal" style="width: 65%; left:15%;">
        <div class="overlay_modal">
            <div class="overlay_closer"><span class="title"></span><span class="btn_close">Cerrar</span></div>
            <table class="display compact nowrap"  id="tblSerie" style="width: 90%">
                <thead>
                    <tr>
                        <th style="width:  30px"></th>
                        <th style="width:  80px">SKU</th>
                        <th style="width:  70px">Num <br>Economico</th>
                        <th style="width:  70px">Serie</th>
                        <th style="width:  40px">Fecha Salida</th>
                        <th style="width:  40px">Fecha Ingreso</th>
                    </tr>
                </thead>
                <tbody></tbody>
            </table>
        </div>
    </div>
<!-- End Ventana modal SERIES -->

<!-- Start Ventana modal CHANGESERIES -->
<div class="overlay_background overlay_hide" id="ChangeSerieModal" style="width: 45%;  left:25%;">
        <div class="overlay_modal">
            <div class="overlay_closer"><span class="title"></span><span class="btn_close">Cerrar</span></div>
            <!-- <button type="button" class="btn btn-sm btn-primary" id="btn_save">Aplicar Selección</button> -->
           
            <div style="height:5px;"></div> <!-- Agregar un espacio -->
            
            <table class="display compact nowrap"  id="tblChangeSerie" style="width: 90%">
                <thead>
                    <tr>
                        <th style="width:  20px">Selecciona</th>
                        <!-- <th style="width:  80px" >SKU</th>
                        <th style="width: 200px" >Descripcion Producto</th> -->
                        <th style="width:  80px">Num Serie</th>
                        <th style="width:  40px">No. Econo</th>
                       <!--  <th style="width:  40px">Etapa</th> -->
                    </tr>
                </thead>
                <tbody></tbody>
            </table>
        </div>
    </div>
<!-- End Ventana modal SERIES -->

<!-- Boton para confirmar salida de productos -->
<div class="modal fade" id="starClosure" tabindex="-1" aria-labelledby="BorrarPerfilLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-sm">
            <div class="modal-content">
            <div class="modal-header ">
            </div>
            <div class="modal-body" style="padding: 0px !important;">
            <div class="row">
                <input type="hidden" class="form-control" id="txtIdClosure" aria-describedby="basic-addon3">
                <div class="col-12 text-center">
                    <span class="modal-title text-center" style="font-size: 1.2rem;" id="BorrarPerfilLabel">¿Estas seguro de dar salida a este proyecto?</span>
                </div>
            </div>
            </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">No</button>
                    <button type="button" class="btn btn-danger" id="btnClosure">Si</button>
                </div>
            </div>
    </div>
</div>

<!-- Modal para imprimir folio de salida -->
<div class="modal fade" id="MoveFolioModal" tabindex="-1" aria-labelledby="BorrarPerfilLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-sm">
            <div class="modal-content">
            <div class="modal-header ">
            </div>
            <div class="modal-body" style="padding: 0px !important;">

            <div class="row">
                <div class="col-12 text-center">
                    <span class="modal-title text-center" style="font-size: 1.2rem;" id="BorrarPerfilLabel">Folio: <h3 class="resFolio">000000000000</h3></span>
                </div>
            </div>

            </div>
                <div class="modal-footer">
                    <!-- <button type="button" class="btn btn-primary" id="btnPrintReport">Imprimir</button> -->
                    <button type="button" class="btn btn-secondary" id="btnHideModal">Cerrar</button>
                </div>
            </div>
    </div>
</div>

<!-- Fondo obscuro -->
<div class="invoice__modalBackgound"></div>

<!-- loading -->
<div class="invoice__loading modalLoading">
        <div class="box_loading">
            <p class="text_loading">
                Registrando Salida de Proyecto<br>
                <i class="fas fa-spinner spin"></i> 
                </p>
            <p>Se estan actualizando los registros del proyecto, este proceso puede tardar varios minutos</p>
        </div>
    </div>
<!-- end -->


<script src="<?=  PATH_ASSETS . 'lib/functions.js?v=1.0.0.0' ?>"></script>
<script src="<?=  PATH_ASSETS . 'lib/dataTable/datatables.min.js?v=1.0.0.0' ?>"></script>
<script src="<?=  PATH_VIEWS . 'WhOutputContent/WhOutputContent.js?v=1.0.0.0' ?>"></script>

<?php require ROOT . FOLDER_PATH . "/app/assets/footer.php"; ?>
