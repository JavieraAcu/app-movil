package io.ionic.starter;

import com.getcapacitor.BridgeActivity;
import com.getcapacitor.Plugin; // Asegúrate de importar esta clase
import com.getcapacitor.community.barcodescanner.BarcodeScanner; // Importa el plugin aquí

import android.os.Bundle;
import java.util.ArrayList;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        // Si hay plugins que necesitas inicializar, puedes hacerlo aquí
        registerPlugin(BarcodeScanner.class);
    }
}
