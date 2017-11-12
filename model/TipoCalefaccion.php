<?php
class TipoCalefaccion {
    
    public static function id($id){
        $url ="https://api-referencias.proyecto2017.linti.unlp.edu.ar/tipo-calefaccion/$id"; 
        
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

        $tipo_calefaccion = json_decode($response, true);  
        if (! empty($tipo_calefaccion)) {
            return $tipo_calefaccion;
        }   
        return false;
    }


    public static function all() {
        // test api

        $url ='https://api-referencias.proyecto2017.linti.unlp.edu.ar/tipo-calefaccion'; 
        
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

        $allTipoCalefaccion = json_decode($response, true);  
        if (! empty($allTipoCalefaccion)) {
            return $allTipoCalefaccion;
        }   
        return false;
    }
}
?>