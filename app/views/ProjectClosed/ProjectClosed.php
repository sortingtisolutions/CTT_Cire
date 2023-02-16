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

        <!-- Sidebar -->
            <div class="mvst_panel" style="width:250px; background-color: fffffff">
                <div class="form-group" >
                    
                    <div class="row">
                        <div class="col-md-12 col-lg-12 col-xl-12 mb-2 form-floating">
                            <select id="txtProjects" class="form-select form-select-sm required"><option value="0" data-content="||||" selected>Selecciona el proyecto</option></select>
                            <label for="txtProjects">Lista de proyectos</label>
                        </div>
                    </div>

                    <div class="row list-finder pos3 hide-items">
                        <div class="col-md-12 col-lg-12 col-xl-12 mb-2 form-floating">
                                <input id="txtExpendab" type="text" class="form-control form-control-sm required" data-mesage="Debes seleccionar una factura" autocomplete="off">
                                <label for="txtExpendab">Monto expendables</label>
                        </div>
                    </div>

                    <div class="row list-finder pos3 hide-items">
                            <div class="col-md-12 col-lg-12 col-xl-12 mb-2 form-floating">
                                    <input id="txtMaintenance" type="text" class="form-control form-control-sm required" data-mesage="Debes seleccionar una factura" autocomplete="off">
                                    <label for="txtMaintenance">Monto mantenimiento</label>                    
                            </div>
                            <div id="listInvoice" class="list-group list-hide">
                                <div class="list-items" ></div>
                            </div>
                    </div>
                    <div class="row list-finder pos3 hide-items">
                            <div class="col-md-12 col-lg-12 col-xl-12 mb-2 form-floating">
                                    <input id="txtDiscount" type="text" class="form-control form-control-sm required" data-mesage="Debes seleccionar una factura" autocomplete="off">
                                    <label for="txtDiscount">Descuento despues de Entrada</label>                    
                            </div>
                            <div id="listInvoice" class="list-group list-hide">
                                <div class="list-items" ></div>
                            </div>
                    </div>

                    <div class="row list-finder pos3 hide-items"> 
                        <div class="col-md-12 col-lg-12 col-xl-12 mb-2 form-floating pos5 hide-items">
                        <input id="txtDiesel" type="text" class="form-control form-control-sm text-center number required" data-mesage="Debes Agregar el precio" >
                            <label for="txtDiesel">Extras Diesel</label>
                        </div>
                     
                    </div>
                   
                    <div class="row list-finder pos1 hide-items">
                        <div class="col-md-12 col-lg-12 col-xl-12 mb-2 form-floating">
                            <textarea class="form-control form-control-sm" id="txtComments" style="height:5rem; text-transform:uppercase" autocomplete="off" rows="3"></textarea>
                            <label for="txtComments">Comentarios</label>
                        </div>
                    </div>
                        <div class="row pos1 hide-items">
                            <div class="col-md-12 mb-5">
                                <button id="btn_exchange" type="button" class="btn btn-sm btn-primary" >Agregar</button>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-6">
                            <button type="button"  class="btn btn-primary btn-sm btn-block" style="font-size: 0.7rem !important;" id="GuardarClosure">Cerrar Proyecto</button>
                        </div>
                        <div class="col-6">
                            <button type="button"  class="btn btn-primary btn-sm btn-block" style="font-size: 0.7rem !important;" id="PrintClosure">Imprimir Resumen</button>
                        </div>
					</div>
            </div>
        <!-- Sidebar -->

        <!-- contenido de operación -->
            <div class="mvst_table projectClosed">
                <h1>Detalles del Proyecto</h1>

                <!-- caja de totales del reporte -->
                <div class="totales">
                    
                    <div class="totales__grupo">
                        <div class="totales__grupo-label">Totales del proyecto</div>
                        <div class="totales__grupo-dato tope"  id="totProject" >0.00</div>
                    </div>

                    <div class="totales__grupo">
                        <div class="totales__grupo-label">Totales Mantenimiento</div>
                        <div class="totales__grupo-dato  tope"  id="totMaintenance" >0.00</div>
                    </div>

                    <div class="totales__grupo">
                        <div class="totales__grupo-label">Totales Expendables</div>
                        <div class="totales__grupo-dato  tope"  id="totExpendab" >0.00</div>
                    </div>

                    <div class="totales__grupo">
                        <div class="totales__grupo-label">Diesel Extra</div>
                        <div class="totales__grupo-dato  tope"  id="totDiesel" >0.00</div>
                    </div>

                    <div class="totales__grupo">
                        <div class="totales__grupo-label">Descuento a aplicar</div>
                        <div class="totales__grupo-dato  tope"  id="totDiscount" >0.00</div>
                    </div>
                    
                    <div class="totales__grupo">
                        <div class="totales__grupo-label">Totales</div>
                        <div class="totales__grupo-dato"  id="totals" >0.00</div>
                    </div>
                        
                </div>
                <!-- caja de totales del reporte -->
                <!-- Tabla de productos del proyecto -->
                    <div class="tabla__contenedor">
                        <table  id="tblProducts">
                            <thead>
                                <tr>
                                    <th class="cn"></th>
                                    <th class="lf">SKU</th>
                                    <th class="lf">Producto</th>
                                    <th class="cn">Cantidad</th>
                                    <th class="cn">Status</th>
                                    <th class="rg">Precio</th>
                                    <th class="lf">Comentarios</th>
                                </tr>
                            </thead>
                            <tbody><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tbody>
                        </table>
                    </div>
                <!-- Tabla de productos del proyecto -->
                
            </div>        
        <!-- contenido de operación -->
      
        </div>


    </div>
    
</div>






<script src="<?=  PATH_ASSETS . 'lib/functions.js?v=1.0.0.0' ?>"></script>
<script src="<?=  PATH_ASSETS . 'lib/dataTable/datatables.min.js?v=1.0.0.0' ?>"></script>
<script src="<?=  PATH_VIEWS . 'ProjectClosed/ProjectClosed.js?v=1.0.0.0' ?>"></script>

<?php require ROOT . FOLDER_PATH . "/app/assets/footer.php"; ?>