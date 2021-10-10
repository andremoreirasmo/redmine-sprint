enum EnumRoleRedmine {
  Owner = 1,
  Admin = 2,
  Contributor = 3,
}

export const EnumRoleRedmineLabel = new Map<number, string>([
  [EnumRoleRedmine.Owner, 'Dono'],
  [EnumRoleRedmine.Admin, 'Administrador'],
  [EnumRoleRedmine.Contributor, 'Integrante'],
]);

export default EnumRoleRedmine;
