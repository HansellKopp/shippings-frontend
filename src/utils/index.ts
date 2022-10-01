export function classNames(...classes: unknown[]): string {
  return classes.filter(Boolean).join(' ')
}

export const ruleRequired = (field: string) => (
  {
    required: true,
    message: `${field} field is required!`,
  }
)

export const getMenuItem = (label: ReactElement, key: string, icon: ReactElement) => {
  return {
    key,
    icon,
    label,
  };
}
