<?php
    defined('BASEPATH') or exit('No se permite acceso directo');
    require_once ROOT . FOLDER_PATH . '/app/models/ProjectPlans/ProjectPlansModel.php';
    require_once LIBS_ROUTE .'Session.php';

class ProjectPlansController extends Controller
{
    private $session;
    public $model;


    public function __construct()
    {
        $this->model = new ProjectPlansModel();
        $this->session = new Session();
        $this->session->init();
        if($this->session->getStatus() === 1 || empty($this->session->get('user')))
            header('location: ' . FOLDER_PATH .'/Login');
    }

    public function exec()
    {
        $params = array('user' => $this->session->get('user'));
        $this->render(__CLASS__, $params);
    }


    // Lista los proyectos
    public function listProjects($request_params)
    {
        $params =  $this->session->get('user');
        $result = $this->model->listProjects($request_params);
        $i = 0;
        while($row = $result->fetch_assoc()){
            $rowdata[$i] = $row;
            $i++;
        }
        if ($i>0){
            $res =  json_encode($rowdata,JSON_UNESCAPED_UNICODE);	
        } else {
            $res =  '[{"pjt_id":"0"}]';	
        }
        echo $res;
    } 

    
// Lista los versiones
    public function listVersion($request_params)
    {
        $params =  $this->session->get('user');
        $result = $this->model->listVersion($request_params);
        $i = 0;
        while($row = $result->fetch_assoc()){
            $rowdata[$i] = $row;
            $i++;
        }
        if ($i>0){
            $res =  json_encode($rowdata,JSON_UNESCAPED_UNICODE);	
        } else {
            $res =  '[{"ver_id":"0"}]';	
        }
        echo $res;
    } 

// Lista el contendio del proyecto
    public function listBudgets($request_params)
    {
        $params =  $this->session->get('user');
        $result = $this->model->listBudgets($request_params);
        $i = 0;
        while($row = $result->fetch_assoc()){
            $rowdata[$i] = $row;
            $i++;
        }
        if ($i>0){
            $res =  json_encode($rowdata,JSON_UNESCAPED_UNICODE);	
        } else {
            $res =  '[{"pjtcn_id":"0"}]';	
        }
        echo $res;
    } 

// Lista de clientes
    public function listCustomers($request_params)
    {
        $params =  $this->session->get('user');
        $result = $this->model->listCustomers($request_params);
        $i = 0;
        while($row = $result->fetch_assoc()){
            $rowdata[$i] = $row;
            $i++;
        }
        if ($i>0){
            $res =  json_encode($rowdata,JSON_UNESCAPED_UNICODE);	
        } else {
            $res =  '[{"cus_id":"0"}]';	
        }
        echo $res;
    } 

// Lista de productores
    public function listCustomersOwn($request_params)
    {
        $params =  $this->session->get('user');
        $result = $this->model->listCustomersOwn($request_params);
        $i = 0;
        while($row = $result->fetch_assoc()){
            $rowdata[$i] = $row;
            $i++;
        }
        if ($i>0){
            $res =  json_encode($rowdata,JSON_UNESCAPED_UNICODE);	
        } else {
            $res =  '[{"cus_id":"0"}]';	
        }
        echo $res;
    } 


// Lista los descuentos
    public function listDiscounts($request_params)
    {
        $params =  $this->session->get('user');
        $result = $this->model->listDiscounts($request_params);
        $i = 0;
        while($row = $result->fetch_assoc()){
            $rowdata[$i] = $row;
            $i++;
        }
        if ($i>0){
            $res =  json_encode($rowdata,JSON_UNESCAPED_UNICODE);	
        } else {
            $res =  '[{"dis_id":"0"}]';	
        }
        echo $res;
    } 

    
// Lista los tipos de proyectos
    public function listProjectsType($request_params)
    {
        $params =  $this->session->get('user');
        $result = $this->model->listProjectsType($request_params);
        $i = 0;
        while($row = $result->fetch_assoc()){
            $rowdata[$i] = $row;
            $i++;
        }
        if ($i>0){
            $res =  json_encode($rowdata,JSON_UNESCAPED_UNICODE);	
        } else {
            $res =  '[{"pjt_id":"0"}]';	
        }
        echo $res;

    } 
    
// Lista los productos
    public function listProducts($request_params)
    {
        $params =  $this->session->get('user');
        $result = $this->model->listProducts($request_params);
        $i = 0;
        while($row = $result->fetch_assoc()){
            $rowdata[$i] = $row;
            $i++;
        }
        if ($i>0){
            $res =  json_encode($rowdata,JSON_UNESCAPED_UNICODE);	
        } else {
            $res =  '[{"prd_id":"0"}]';	
        }
        echo $res;
    } 

// Lista los comentarios del proyecto
    public function listComments($request_params)
    {
        $params =  $this->session->get('user');
        $result = $this->model->listComments($request_params);
        $i = 0;
        while($row = $result->fetch_assoc()){
            $rowdata[$i] = $row;
            $i++;
        }
        if ($i>0){
            $res =  json_encode($rowdata,JSON_UNESCAPED_UNICODE);	
        } else {
            $res =  '[{"com_id":"0"}]';	
        }
        echo $res;
    } 






    
// Guarda el comentario
    public function InsertComment($request_params)
    {
        $params =  $this->session->get('user');
        $result = $this->model->InsertComment($request_params, $params);

        $i = 0;
        while($row = $result->fetch_assoc()){
            $rowdata[$i] = $row;
            $i++;
        }
        if ($i>0){
            $res =  json_encode($rowdata,JSON_UNESCAPED_UNICODE);	
        } else {
            $res =  '[{"com_id":"0"}]';	
        }
        echo $res;
        
    } 

    
// Actualiza datos del proyecto
    public function UpdateProject($request_params)
    {
        $params =  $this->session->get('user');
        $result = $this->model->UpdateProject($request_params);
        echo $result;
    } 
//

// Guarda nueva version
    public function SaveVersion($request_params)
    {
        $params =  $this->session->get('user');
        $result = $this->model->SaveVersion($request_params);
        echo $result;
    } 
//

// Promueve proyecto
    public function PromoteProject($request_params)
    {
        $params =  $this->session->get('user');
        $result = $this->model->PromoteProject($request_params);
        echo $result;
    } 
//

// Lista los relacionados al producto
    public function listProductsRelated($request_params)
    {
        $params =  $this->session->get('user');
        $result = $this->model->listProductsRelated($request_params);
        $i = 0;
        while($row = $result->fetch_assoc()){
            $rowdata[$i] = $row;
            $i++;
        }
        if ($i>0){
            $res =  json_encode($rowdata,JSON_UNESCAPED_UNICODE);	
        } else {
            $res =  '[{"prd_id":"0"}]';	
        }
        echo $res;
    } 
//

// Lista los proyectos en donde se encuentra un producto
    public function stockProdcuts($request_params)
    {
        $params =  $this->session->get('user');
        $result = $this->model->stockProdcuts($request_params);
        $i = 0;
        while($row = $result->fetch_assoc()){
            $rowdata[$i] = $row;
            $i++;
        }
        if ($i>0){
            $res =  json_encode($rowdata,JSON_UNESCAPED_UNICODE);	
        } else {
            $res =  '[{"prd_name":"0"}]';	
        }
        echo $res;
    } 
//

// Actualiza la tabla concentradora del contenido del proyecto
    public function updateMice($request_params)
    {
        $params =  $this->session->get('user');
        $result = $this->model->updateMice($request_params);
        echo $result;
    }
//

// Actualiza la tabla concentradora del contenido del proyecto
    public function AddProductMice($request_params)
    {
        $params =  $this->session->get('user');
        $result = $this->model->AddProductMice($request_params);
        echo $result;
    }
//

/** ==== Actualiza contenido de la version actual ============================================  */
    public function SaveBudget($request_params){
        $params = $this->session->get('user');
        $result = $this->model->SaveBudget($request_params);

        while($row = $result->fetch_assoc()){
            $action = $row["pjtvr_action"];
            $qtyAct = $row["pjtvr_quantity"];
            $qtyAnt = $row["pjtvr_quantity_ant"];
            $qtyAct = intval($qtyAct);
            $qtyAnt = intval($qtyAnt);

            echo $qtyAct;
            echo $qtyAnt;

            if ($action == 'U'){
                echo 'Actualiza ';
                if ($qtyAct > $qtyAnt){
                    echo 'Agrega ' . ($qtyAct - $qtyAnt);
                } else if ($qtyAct < $qtyAnt){
                    echo 'Quita ' . ($qtyAnt - $qtyAct);
                }
            }
            if ($action == 'D'){
                echo 'Borra ';
            }
            if ($action == 'A'){
                echo 'Agrega ';
            }
             
            
        }


    }

/** ==== Guarda contenido de la nueva version ================================================  */
    public function SaveBudgetAs($request_params)
    {
        $params = $this->session->get('user');
        $budget = $this->model->SaveBudgetAs($request_params);

        $response = explode('|', $budget);
        $verId = $response[0];
        $pjtId = $response[1];
        $rowcr = $response[2];



        $periods    = $this->model->cleanPeriods($pjtId);
        $series     = $this->model->restoreSeries($pjtId);
        $detail     = $this->model->cleanDetail($pjtId);
        $content    = $this->model->cleanContent($pjtId);
        $result     = $this->model->restoreContent($verId);
        
        while($row = $result->fetch_assoc()){
            $dtstar = $row["pjt_date_start"];
            $dybase = $row["pjtcn_days_base"];
            $dycost = $row["pjtcn_days_cost"];
            $dytrip = $row["pjtcn_days_trip"] / 2;
            $dytest = $row["pjtcn_days_test"];
            $quanty = $row["pjtcn_quantity"];
            $prodId = $row["prd_id"];
            $pjetId = $row["pjtcn_id"];
            $dyinic = $dytrip + $dytest;
            $dyfinl = $dytrip + $dybase;
            $dtinic = date('Y-m-d',strtotime($dtstar . '-'. $dyinic .' days'));
            $dtfinl = date('Y-m-d',strtotime($dtstar . '+'. ($dyfinl-1) .' days')); 

            $bdgsku = $row["pjtcn_prod_sku"];
            $bdgnme = $row["pjtcn_prod_name"];
            $bdgprc = $row["pjtcn_prod_price"];
            $bdglvl = $row["pjtcn_prod_level"];
            $dsbase = $row["pjtcn_discount_base"];
            $dstrip = $row["pjtcn_discount_trip"];
            $dstest = $row["pjtcn_discount_test"];
            $bdgIns = $row["pjtcn_insured"];
            $prdexp = $row["srv_id"];
            $versId = $row["ver_id"];

            $ttlqty = $prdexp == '2'? $quanty: 1;
            $quanty = $prdexp == '2'? 1: $quanty;

            if ( $bdglvl == 'A' ){
                echo 'Accesorio';
                for ($i = 1; $i<=$quanty; $i++){   // VALIDA LA CANTIDAD A REALIZA POR CONCEPTO 

                    $params = array(
                        'pjetId' => $pjetId, 
                        'prodId' => $prodId, 
                        'dtinic' => $dtinic, 
                        'dtfinl' => $dtfinl,
                        'bdgsku' => $bdgsku,
                        'bdgnme' => $bdgnme,
                        'bdgprc' => $bdgprc,
                        'bdglvl' => $bdglvl,
                        'bdgqty' => $ttlqty,
                        'dybase' => $dybase,
                        'dycost' => $dycost,
                        'dsbase' => $dsbase,
                        'dytrip' => $dytrip,
                        'dstrip' => $dstrip,
                        'dytest' => $dytest,
                        'dstest' => $dstest,
                        'bdgIns' => $bdgIns,
                        'versId' => $versId,
                        'detlId' => 0,
                    );
                    $serie = $this->model->SettingSeries($params);
                    // echo $serie . ' - ' ;
                }
            } else if ( $bdglvl == 'P' ){
                for ($i = 1; $i<=$quanty; $i++){
                    
                    $params = array(
                        'pjetId' => $pjetId, 
                        'prodId' => $prodId, 
                        'dtinic' => $dtinic, 
                        'dtfinl' => $dtfinl,
                        'bdgsku' => $bdgsku,
                        'bdgnme' => $bdgnme,
                        'bdgprc' => $bdgprc,
                        'bdglvl' => $bdglvl,
                        'bdgqty' => $ttlqty,
                        'dybase' => $dybase,
                        'dycost' => $dycost,
                        'dsbase' => $dsbase,
                        'dytrip' => $dytrip,
                        'dstrip' => $dstrip,
                        'dytest' => $dytest,
                        'dstest' => $dstest,
                        'bdgIns' => $bdgIns,
                        'versId' => $versId,
                        'detlId' => 0,
                    );
                    $detlId = $this->model->SettingSeries($params);

                    $accesory = $this->model->GetAccesories($prodId);
                    while($acc = $accesory->fetch_assoc()){

                        $acceId =  $acc["prd_id"];
                        $acceNm =  $acc["prd_name"];
                        $accePc =  $acc["prd_price"];

                        $accparams = array(
                            'pjetId' => $pjetId, 
                            'prodId' => $acceId, 
                            'dtinic' => $dtinic, 
                            'dtfinl' => $dtfinl,
                            'bdgsku' => $bdgsku,
                            'bdgnme' => $acceNm,
                            'bdgprc' => $accePc,
                            'bdglvl' => 'A',
                            'bdgqty' => $ttlqty,
                            'dybase' => $dybase,
                            'dycost' => $dycost,
                            'dsbase' => $dsbase,
                            'dytrip' => $dytrip,
                            'dstrip' => $dstrip,
                            'dytest' => $dytest,
                            'dstest' => $dstest,
                            'bdgIns' => $bdgIns,
                            'versId' => $versId,
                            'detlId' => $detlId,
                        );
                        $serie = $this->model->SettingSeries($accparams);
                    }

                }
            } else if ( $bdglvl == 'K' ){
                for ($i = 1; $i<=$quanty; $i++){
                    $products = $this->model->GetProducts($prodId);
                    while($acc = $products->fetch_assoc()){

                        $pkpdId =  $acc["prd_id"];
                        $pkpdNm =  $acc["prd_name"];
                        $pkpdPc =  $acc["prd_price"];

                        $prodparams = array(
                            'pjetId' => $pjetId, 
                            'prodId' => $pkpdId, 
                            'dtinic' => $dtinic, 
                            'dtfinl' => $dtfinl,
                            'bdgsku' => $bdgsku,
                            'bdgnme' => $pkpdNm,
                            'bdgprc' => $pkpdPc,
                            'bdglvl' => 'P',
                            'bdgqty' => $ttlqty,
                            'dybase' => $dybase,
                            'dycost' => $dycost,
                            'dsbase' => $dsbase,
                            'dytrip' => $dytrip,
                            'dstrip' => $dstrip,
                            'dytest' => $dytest,
                            'dstest' => $dstest,
                            'bdgIns' => $bdgIns,
                            'versId' => $versId,
                            'detlId' => 0,
                        );
                        $detlId = $this->model->SettingSeries($prodparams);

                        $accesory = $this->model->GetAccesories($pkpdId);
                        while($acc = $accesory->fetch_assoc()){
    
                            $acceId =  $acc["prd_id"];
                            $acceNm =  $acc["prd_name"];
                            $accePc =  $acc["prd_price"];
    
                            $accparams = array(
                                'pjetId' => $pjetId, 
                                'prodId' => $acceId, 
                                'dtinic' => $dtinic, 
                                'dtfinl' => $dtfinl,
                                'bdgsku' => $bdgsku,
                                'bdgnme' => $acceNm,
                                'bdgprc' => $accePc,
                                'bdglvl' => 'A',
                                'bdgqty' => $ttlqty,
                                'dybase' => $dybase,
                                'dycost' => $dycost,
                                'dsbase' => $dsbase,
                                'dytrip' => $dytrip,
                                'dstrip' => $dstrip,
                                'dytest' => $dytest,
                                'dstest' => $dstest,
                                'bdgIns' => $bdgIns,
                                'versId' => $versId,
                                'detlId' => $detlId,
                            );
                            $serie = $this->model->SettingSeries($accparams);
                        }
                    }
                }
            }
        }
        

       echo $pjtId . '|' . $rowcr;
        
    } 
// -

}