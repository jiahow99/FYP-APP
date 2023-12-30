
/**
 * Year make for cars
 */
const currentYear = new Date().getFullYear();
const startYear = 1990; 
export const yearMake = Array.from({ length: currentYear - startYear + 1 }, (_, index) => {
    const year = currentYear - index;
    return { label: year.toString(), value: year.toString() };
}).reverse();


/**
 * Car models
 */
export const carBrands = [
    { label: 'BMW', value: 'BMW' },
    { label: 'BYD', value: 'BYD' },
    { label: 'Chevrolet', value: 'Chevrolet' },
    { label: 'Ford', value: 'Ford' },
    { label: 'Honda', value: 'Honda' },
    { label: 'Jaguar', value: 'Jaguar' },
    { label: 'Kia', value: 'Kia' },
    { label: 'Lexus', value: 'Lexus' },
    { label: 'Mazda', value: 'Mazda' },
    { label: 'Mercedez', value: 'Mercedez' },
    { label: 'Nissan', value: 'Nissan' },
    { label: 'Perodua', value: 'Perodua' },
    { label: 'Porsche', value: 'Porsche' },
    { label: 'Proton', value: 'Proton' },
    { label: 'Range Rover', value: 'Range Rover' },
    { label: 'Subaru', value: 'Subaru' },
    { label: 'Toyota', value: 'Toyota' },
    { label: 'Volkswagen', value: 'Volkswagen' },
    { label: 'Volvo', value: 'Volvo' }
];

export const carModels = {
    'BMW': [
        { label: '1 Series', value: '1 Series' },
        { label: '2 Series', value: '2 Series' },
        { label: '3 Series', value: '3 Series' },
        { label: '4 Series', value: '4 Series' },
        { label: '5 Series', value: '5 Series' },
        { label: '6 Series', value: '6 Series' },
        { label: '7 Series', value: '7 Series' },
        { label: '8 Series', value: '8 Series' },
        { label: 'X1', value: 'X1' },
        { label: 'X2', value: 'X2' },
        { label: 'X4', value: 'X4' },
        { label: 'X5', value: 'X5' },
        { label: 'X6', value: 'X6' },
        { label: 'XM', value: 'XM' },
        { label: 'Ix', value: 'Ix' },
        { label: 'i4', value: 'i4' },
        { label: 'i8', value: 'i8' },
        { label: 'M2', value: 'M2' },
        { label: 'M3', value: 'M3' },
        { label: 'M4', value: 'M4' },
        { label: 'M8', value: 'M8' },
    ],
    'BYD': [
        { label: 'ATTO 3', value: 'ATTO 3' },
        { label: 'E6', value: 'E6' },
        { label: 'TANG', value: 'TANG' },
        { label: 'Dolphin', value: 'Dolphin' },
    ],
    'Chevrolet': [
        { label: 'Aveo', value: 'Aveo' },
        { label: 'Cruze', value: 'Cruze' },
        { label: 'Malibu', value: 'Malibu' },
        { label: 'Malibu', value: 'Malibu' },
        { label: 'Sonic', value: 'Sonic' },
    ],
    'Ford': [
        { label: 'Fiesta', value: 'Fiesta' },
        { label: 'Focus', value: 'Focus' },
        { label: 'Mustang', value: 'Mustang' },
        { label: 'Ranger', value: 'Ranger' },
    ],
    'Honda': [
        { label: 'Civic', value: 'Civic' },
        { label: 'City', value: 'City' },
        { label: 'Accord', value: 'Accord' },
        { label: 'HR-V', value: 'HR-V' },
        { label: 'CR-V', value: 'CR-V' },
        { label: 'BR-V', value: 'BR-V' },
    ],
    'Jaguar': [
        { label: 'XE', value: 'XE' },
        { label: 'XF', value: 'XF' },
        { label: 'XJ', value: 'XJ' },
        { label: 'F-PACE', value: 'F-PACE' },
        { label: 'E-PACE', value: 'E-PACE' },
        { label: 'I-PACE', value: 'I-PACE' },
    ],
    'Kia': [
        { label: 'Seltos', value: 'Seltos' },
        { label: 'Cerato', value: 'Cerato' },
        { label: 'Sportage', value: 'Sportage' },
        { label: 'Optima', value: 'Optima' },
        { label: 'Carnival', value: 'Carnival' },
    ],
    'Lexus': [
        { label: 'ES', value: 'ES' },
        { label: 'RX', value: 'RX' },
        { label: 'NX', value: 'NX' },
        { label: 'LS', value: 'LS' },
        { label: 'GX', value: 'GX' },
    ],
    'Mazda': [
        { label: 'Mazda2', value: 'Mazda2' },
        { label: 'Mazda3', value: 'Mazda3' },
        { label: 'Mazda6', value: 'Mazda6' },
        { label: 'CX-3', value: 'CX-3' },
        { label: 'CX-30', value: 'CX-30' },
        { label: 'CX-5', value: 'CX-5' },
        { label: 'CX-8', value: 'CX-8' },
        { label: 'MX-30', value: 'MX-30' },
    ],
    'Mercedez': [
        { label: 'A-Class', value: 'A-Class' },
        { label: 'C-Class', value: 'C-Class' },
        { label: 'E-Class', value: 'E-Class' },
        { label: 'S-Class', value: 'S-Class' },
        { label: 'GLA', value: 'GLA' },
        { label: 'GLC', value: 'GLC' },
        { label: 'GLE', value: 'GLE' },
        { label: 'CLA', value: 'CLA' },
        { label: 'CLE', value: 'CLE' },
        { label: 'CLS', value: 'CLS' },
    ],
    'Nissan': [
        { label: 'Almera', value: 'Almera' },
        { label: 'X-Trail', value: 'X-Trail' },
        { label: 'Serena', value: 'Serena' },
        { label: 'Navara', value: 'Navara' },
        { label: 'Leaf', value: 'Leaf' },
    ],
    'Perodua': [
        { label: 'Axia', value: 'Axia' },
        { label: 'Myvi', value: 'Myvi' },
        { label: 'Bezza', value: 'Bezza' },
        { label: 'Aruz', value: 'Aruz' },
        { label: 'Alza', value: 'Alza' },
    ],
    'Porsche': [
        { label: '911', value: '911' },
        { label: 'Cayenne', value: 'Cayenne' },
        { label: 'Panamera', value: 'Panamera' },
        { label: 'Macan', value: 'Macan' },
        { label: 'Taycan', value: 'Taycan' },
    ],
    'Proton': [
        { label: 'Saga', value: 'Saga' },
        { label: 'Persona', value: 'Persona' },
        { label: 'X50', value: 'X50' },
        { label: 'X70', value: 'X70' },
        { label: 'Perdana', value: 'Perdana' },
        { label: 'Iriz', value: 'Iriz' },
        { label: 'Exora', value: 'Exora' },
    ],
    'Range Rover': [
        { label: 'Evoque', value: 'Evoque' },
        { label: 'Sport', value: 'Sport' },
        { label: 'Velar', value: 'Velar' },
        { label: 'Vogue', value: 'Vogue' },
    ],
    'Subaru': [
        { label: 'XV', value: 'XV' },
        { label: 'Forester', value: 'Forester' },
        { label: 'Outback', value: 'Outback' },
        { label: 'WRX', value: 'WRX' },
    ],
    'Toyota': [
        { label: 'Vios', value: 'Vios' },
        { label: 'Yaris', value: 'Yaris' },
        { label: 'Altis', value: 'Altis' },
        { label: 'Camry', value: 'Camry' },
        { label: 'Innova', value: 'Innova' },
        { label: 'Fortuner', value: 'Fortuner' },
    ],
    'Volkswagen': [
        { label: 'Polo', value: 'Polo' },
        { label: 'Golf', value: 'Golf' },
        { label: 'Jetta', value: 'Jetta' },
        { label: 'Passat', value: 'Passat' },
        { label: 'Tiguan', value: 'Tiguan' },
    ],
    'Volvo': [
        { label: 'S60', value: 'S60' },
        { label: 'S90', value: 'S90' },
        { label: 'XC40', value: 'XC40' },
        { label: 'XC60', value: 'XC60' },
        { label: 'XC90', value: 'XC90' },
    ]
};
  
  
  
  
  
  
  