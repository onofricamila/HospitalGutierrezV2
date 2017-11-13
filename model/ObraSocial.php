<?php
class ObraSocial {
   
    public static function id($id){
        $url ="https://api-referencias.proyecto2017.linti.unlp.edu.ar/obra-social/$id"; 
        
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

        $obra_social = json_decode($response, true); 
        var_dump(  $obra_social); 
        if (! empty($obra_social)) {
            return $obra_social;
        }   
        return false;
    }


    public static function all() {
        // test api

        $url ='https://api-referencias.proyecto2017.linti.unlp.edu.ar/obra-social'; 
        
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

        $allObraSocial = json_decode($response, true);  
        if (! empty($allObraSocial)) {
            return $allObraSocial;
        }   
        return false;
    }

}
?>