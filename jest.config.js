module.exports = {
    testEnvironment: 'node', // Configura el entorno de prueba (en este caso, Node.js)
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.jsx?$', // Patrón para ubicar los archivos de prueba
    moduleFileExtensions: ['js', 'jsx', 'json'], // Extensiones de archivo que Jest reconocerá como módulos
    collectCoverage: true, // Habilita la generación de informes de cobertura de código
    coverageReporters: ['lcov', 'text'], // Configura los formatos de informe de cobertura
    // Aquí puedes agregar más opciones de configuración según tus necesidades
  };
  