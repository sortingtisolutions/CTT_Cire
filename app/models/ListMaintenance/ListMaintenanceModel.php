<?php
defined('BASEPATH') or exit('No se permite acceso directo');
require( ROOT . PATH_ASSETS.  'ssp.class.php' );

class ListMaintenanceModel extends Model
{
	public function __construct()
	{
		parent::__construct();
	}


// Obtiene el listado de las subcategorias activas   *****
    public function listCategories($params)
    {
        $qry = "SELECT * FROM ctt_project_change_reason ORDER BY 1;";

        return $this->db->query($qry);
    }

    
// Obtiene el listado de las subcategorias activas
    public function listWaytoPay($params)
    {

        $qry = "SELECT * FROM ctt_project_change_reason ORDER BY 1;";

        return $this->db->query($qry);
    }

    
// Obtiene el listado de las subcategorias activas
    public function SaveSubcategory($params)
    {
        $sbcName = $this->db->real_escape_string($params['sbcName']);
        $sbcCode = $this->db->real_escape_string($params['sbcCode']);
        $catId = $this->db->real_escape_string($params['catId']);


        $qry = "INSERT INTO ctt_subcategories(sbc_code, sbc_name, sbc_status, cat_id)
                VALUES('$sbcCode',UPPER('$sbcName'),1,'$catId')";
        $this->db->query($qry);	
        $sbcId = $this->db->insert_id;
		return $sbcId;
    }

// Actualiza la subcategorias seleccionada
    public function UpdateSubcategory($params)
    {
        $sbcId      = $this->db->real_escape_string($params['sbcId']);
        $sbcName    = $this->db->real_escape_string($params['sbcName']);
        $sbcCode    = $this->db->real_escape_string($params['sbcCode']);
        $catId      = $this->db->real_escape_string($params['catId']);

        $qry = "UPDATE ctt_subcategories
                SET 
                      sbc_name  = UPPER('$sbcName'),
                      sbc_code  = '$sbcCode',
                      cat_id    = '$catId'
                WHERE sbc_id    = '$sbcId';";

        $this->db->query($qry);	
        return $sbcId;
    }

// Actualiza el status de la subcategorias a eliminar
    public function DeleteSubcategory($params)
    {
        $sbcid      = $this->db->real_escape_string($params['sbcId']);

        $qry = "UPDATE ctt_subcategories SET sbc_status = '0'
                WHERE sbc_id  = '$sbcid';";

        $this->db->query($qry);	
        return $sbcid;
    }

}