/** Hidden trap for bots. Must stay empty — server rejects submissions that fill it. */
export const FORM_HONEYPOT_NAME = 'companyWebsite'

export function FormHoneypot() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute -left-[9999px] h-0 w-0 overflow-hidden opacity-0"
    >
      <label htmlFor={FORM_HONEYPOT_NAME}>Company website</label>
      <input
        id={FORM_HONEYPOT_NAME}
        name={FORM_HONEYPOT_NAME}
        type="text"
        tabIndex={-1}
        autoComplete="off"
        defaultValue=""
      />
    </div>
  )
}
