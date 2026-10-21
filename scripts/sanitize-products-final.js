const fs = require('fs');
let code = fs.readFileSync('data/products.ts', 'utf8');

code = code.replace(/"Staircase"/g, '"Flooring"');
code = code.replace(/"Pooja Room"/g, '"Wall Cladding — Interior"');
code = code.replace(/"Pooja"/g, '"Sacred"');
code = code.replace(/"Facade"/g, '"Wall Cladding — Exterior"');
code = code.replace(/"Outdoor"/g, '"Exterior Flooring"');
code = code.replace(/"Dining & Living"/g, '"Table Top"');
code = code.replace(/"Furniture"/g, '"Table Top"');
code = code.replace(/"Countertop"/g, '"Kitchen Countertop"');
code = code.replace(/"Wall Cladding"/g, '"Wall Cladding — Interior"');

code = code.replace(/Regular crystallisation buffing to maintain mirror polish\./g, 'Regular fine pad buffing to maintain mirror polish.');
code = code.replace(/Penthouse Double-Height Staircases/g, 'Penthouse Double-Height Wall Cladding');
code = code.replace(/Sanctum Pooja Backlit Panels/g, 'Sanctum Sanctuary Backlit Panels');
code = code.replace(/Backlit Sanctuary & Pooja Mandirs/g, 'Backlit Sanctuary & Feature Mandirs');
code = code.replace(/Ultra-Luxury Speakeasy Bars/g, 'Luxury Lounge Bars');
code = code.replace(/Ultra-Luxury Resort Villas/g, 'Luxury Resort Villas');
code = code.replace(/makrana-hand-carved-mandir-sanctuary/g, 'hand-carved-mandir-sanctuary');
code = code.replace(/Hand-Carved Makrana Pure White Marble Mandir/g, 'Hand-Carved Pure White Marble Mandir');

fs.writeFileSync('data/products.ts', code, 'utf8');
console.log('Sanitized data/products.ts successfully');
