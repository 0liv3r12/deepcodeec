import { limpiar, validar } from './contacto';

test('limpiar quita caracteres de control y recorta, pero deja saltos de línea si se pide', () => {
    expect(limpiar('  Oliver\u0000\u0007 ')).toBe('Oliver');
    expect(limpiar('a\nb')).toBe('a b');
    expect(limpiar('a\nb', true)).toBe('a\nb');
    expect(limpiar('a\u007Fb')).toBe('a b');
    expect(limpiar('  María\u0007 José ')).toBe('María José');
});

test('validar exige nombre, tipo de la lista y un mensaje con contenido', () => {
    const ok = { nombre: 'Oliver', tipo: 'Sitio web', mensaje: 'Quiero un sitio con reservas.' };
    expect(validar(ok)).toEqual({});
    expect(validar({ ...ok, nombre: 'A' })).toHaveProperty('nombre');
    expect(validar({ ...ok, nombre: 'x'.repeat(81) })).toHaveProperty('nombre');
    expect(validar({ ...ok, tipo: 'Otra cosa' })).toHaveProperty('tipo'); // solo valores de la lista
    expect(validar({ ...ok, mensaje: 'hola' })).toHaveProperty('mensaje');
    expect(validar({ ...ok, mensaje: 'x'.repeat(601) })).toHaveProperty('mensaje');
});
