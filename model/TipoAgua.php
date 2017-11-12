<?php
class TipoAgua {
    
    public static function id($id){
        $url ="https://api-referencias.proyecto2017.linti.unlp.edu.ar/tipo-agua/$id"; 
        
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

        $tipo_agua = json_decode($response, true);  
        if (! empty($tipo_agua)) {
            return $tipo_agua;
        }   
        return false;
    }


    public static function all() {
        // test api

        $url ='https://api-referencias.proyecto2017.linti.unlp.edu.ar/tipo-agua'; 
        
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

        $allTipoAgua = json_decode($response, true);  
        if (! empty($allTipoAgua)) {
            return $allTipoAgua;
        }   
        return false;
    }
}
?>