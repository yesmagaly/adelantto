import { Nav } from "@adelantto/core";

export function AppNav() {
  return (
    <Nav.Root>
      <Nav.Item icon="home" to="/home">
        Home
      </Nav.Item>
      <Nav.Item icon="currency_exchange" to="/loans">
        Adelanttos
      </Nav.Item>
      <Nav.Item icon="location_on" to="https://wa.me/5215593314221" target="_blank">
        Contacto
      </Nav.Item>
      <Nav.Item icon="person" to="/profile">
        Perfil
      </Nav.Item>
    </Nav.Root>
  );
}
