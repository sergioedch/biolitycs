<?php
// 1. Configuración de API y obtención del slug
$apiBaseUrl = "https://demo.qualitechai.com/api/noticias-biolitycs/";
$slug = isset($_GET['slug']) ? trim($_GET['slug']) : '';
$noticia = null;

// 2. Consulta a la API desde el servidor PHP
if (!empty($slug)) {
    $apiUrl = $apiBaseUrl . urlencode($slug);
    
    // Configurar timeout y cabeceras para cURL / file_get_contents
    $opts = [
        "http" => [
            "method" => "GET",
            "header" => "User-Agent: BiolitycsLabServer/1.0\r\n",
            "timeout" => 4
        ]
    ];
    $context = stream_context_create($opts);
    $json = @file_get_contents($apiUrl, false, $context);

    if ($json !== false) {
        $response = json_decode($json, true);
        if (isset($response['success']) && $response['success'] && !empty($response['data'])) {
            $noticia = $response['data'];
        }
    }
}

// 3. Variables de fallback si no hay noticia o hubo error
$metaTitle = $noticia ? ($noticia['meta_title'] ?: $noticia['titulo']) : 'Biolitycs Lab | Artículo';
$metaDesc = $noticia ? ($noticia['meta_description'] ?: $noticia['resumen']) : 'Descubre nuestros últimos artículos e investigaciones en Biolitycs Lab.';
$metaImage = ($noticia && !empty($noticia['imagen_portada'])) ? $noticia['imagen_portada'] : 'https://bioliticslab.com/logo_blanco.ico';
$currentUrl = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . "://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";
?>
<!doctype html>
<html lang="es">

    <head>
        <meta charset="UTF-8" />
        <link rel="icon" type="image/svg+xml" href="/logo_blanco.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        
        <!-- SEO Básico -->
        <title><?= htmlspecialchars($metaTitle) ?></title>
        <meta name="description" content="<?= htmlspecialchars($metaDesc) ?>" />
        <meta name="robots" content="index, follow" />
        <meta name="theme-color" content="#003865" />

        <!-- Open Graph / WhatsApp / Facebook / LinkedIn -->
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Biolitycs Lab" />
        <meta property="og:title" content="<?= htmlspecialchars($metaTitle) ?>" />
        <meta property="og:description" content="<?= htmlspecialchars($metaDesc) ?>" />
        <meta property="og:image" content="<?= htmlspecialchars($metaImage) ?>" />
        <meta property="og:url" content="<?= htmlspecialchars($currentUrl) ?>" />

        <!-- Twitter Cards -->
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="<?= htmlspecialchars($metaTitle) ?>" />
        <meta name="twitter:description" content="<?= htmlspecialchars($metaDesc) ?>" />
        <meta name="twitter:image" content="<?= htmlspecialchars($metaImage) ?>" />

        <!-- Inyección de datos para JavaScript (Evita segundo fetch) -->
        <script>
            window.INITIAL_NOTICIA_DATA = <?= json_encode($noticia) ?>;
        </script>
    </head>

    <body class="bg-light">

        <load src="/src/components/navbar.html" />

        <main class="py-5 mt-5">
            <div id="detalle-noticia" class="container py-5 min-vh-100">
                <!-- Spinner por si JS tarda en cargar -->
                <div class="text-center py-5 mt-5">
                    <div class="spinner-border text-primary" role="status" style="width: 3rem; height: 3rem;">
                        <span class="visually-hidden">Cargando...</span>
                    </div>
                    <p class="mt-3 text-muted fw-semibold">Cargando artículo...</p>
                </div>
            </div>
        </main>

        <load src="/src/components/footer.html" />
        <load src="/src/components/modals.html" />

        <script type="module" src="/src/main.js"></script>
        <script type="module" src="/src/js/detalle.js"></script>
    </body>

</html>