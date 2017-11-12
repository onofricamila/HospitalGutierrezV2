<?php
class TipoDoc {
    
    public static function id($id){
        $url ="https://api-referencias.proyecto2017.linti.unlp.edu.ar/tipo-documento/$id"; 
        
        $ch = curl_init($url); 
        // Configuring curl options 
        $options = array( 
            CURLOPT_RETURNTRANSFER => true,     
            CURLOPT_HTTPHEADER => array('Accept: application/json'), 
            CURLOPT_SSL_VERIFYPEER => false,     
        ); 
        // Setting curl options 
        curl_setopt_array( $ch, $options );     
        // Getting results 
        $response = curl_exec($ch); // Getting jSON result string   
        // Cerrar el recurso cURL y liberar recursos del sistema 
        curl_close($ch);   

        $tipo_doc = json_decode($response, true);  
        if (! empty($tipo_doc)) {
            return $tipo_doc;
        }   
        return false;
    }


    public static function all() {
        // test api

        $url ='https://api-referencias.proyecto2017.linti.unlp.edu.ar/tipo-documento'; 
        
        $ch = curl_init($url); 
        // Configuring curl options 
        $options = array( 
            CURLOPT_RETURNTRANSFER => true,     
            CURLOPT_HTTPHEADER => array('Accept: application/json'), 
            CURLOPT_SSL_VERIFYPEER => false,     
        ); 
        // Setting curl options 
        curl_setopt_array( $ch, $options );     
        // Getting results 
        $response = curl_exec($ch); // Getting jSON result string   
        // Cerrar el recurso cURL y liberar recursos del sistema 
        curl_close($ch);   

        $allTipoDoc = json_decode($response, true);  
        if (! empty($allTipoDoc)) {
            return $allTipoDoc;
        }   
        return false;
    }
}
?>