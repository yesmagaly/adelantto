import { Nav } from "@adelantto/core";

export function AppNav() {
  return (
    <Nav.Root>
      <Nav.Item icon="home" href="/home">
        Home
      </Nav.Item>
      <Nav.Item icon="currency_exchange" href="/adelanttos">
        Home
      </Nav.Item>
      <Nav.Item icon="location_on" href="/contact">
        Contacto
      </Nav.Item>
      <Nav.Item icon="person" href="/profile">
        Perfil
      </Nav.Item>
    </Nav.Root>
  );
}
