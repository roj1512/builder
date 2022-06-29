import { User } from "https://deno.land/x/grammy@v1.9.0/platform.deno.ts";
import { md } from "https://deno.land/x/esc@0.0.0/mod.ts";

export class MarkdownV2 {
  #text = "";

  constructor() {
  }

  get text() {
    return this.#text;
  }

  push(text: string) {
    this.#text += md(text);
  }

  bold(text: string) {
    this.#text += `*${md(text)}*`;
  }

  italic(text: string) {
    this.#text += `_${md(text)}_`;
  }

  underline(text: string) {
    this.#text += `__${md(text)}__`;
  }

  strikethrough(text: string) {
    this.#text += `~${md(text)}~`;
  }

  spoiler(text: string) {
    this.#text += `||${md(text)}||`;
  }

  code(text: string) {
    this.#text += `\`${text}\``;
  }

  pre(text: string, language?: string) {
    this.#text += `\n\`\`\`${language ?? ""}\n${text}\n\`\`\`\n`;
  }

  link(url: string, text?: string) {
    this.#text += text ? `[${md(text)}](${md(url)})` : md(url);
  }

  mention(idOrUser: number | User, text?: string) {
    this.link(
      `tg://user?id=${typeof idOrUser == "number" ? idOrUser : idOrUser.id}`,
      text ?? typeof idOrUser === "number"
        ? String(idOrUser)
        : (idOrUser.first_name + " " + (idOrUser.last_name ?? "")).trim(),
    );
  }
}
