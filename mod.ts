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
    return this;
  }

  bold(text: string) {
    this.#text += `*${md(text)}*`;
    return this;
  }

  italic(text: string) {
    this.#text += `_${md(text)}_`;
    return this;
  }

  underline(text: string) {
    this.#text += `__${md(text)}__`;
    return this;
  }

  strikethrough(text: string) {
    this.#text += `~${md(text)}~`;
    return this;
  }

  spoiler(text: string) {
    this.#text += `||${md(text)}||`;
    return this;
  }

  code(text: string) {
    this.#text += `\`${text}\``;
    return this;
  }

  pre(text: string, language?: string) {
    this.#text += `\n\`\`\`${language ?? ""}\n${text}\n\`\`\`\n`;
    return this;
  }

  link(url: string, text?: string) {
    this.#text += text ? `[${md(text)}](${md(url)})` : md(url);
    return this;
  }

  mention(idOrUser: number | User, text?: string) {
    return this.link(
      `tg://user?id=${typeof idOrUser == "number" ? idOrUser : idOrUser.id}`,
      text ?? typeof idOrUser === "number"
        ? String(idOrUser)
        : (idOrUser.first_name + " " + (idOrUser.last_name ?? "")).trim(),
    );
  }
}
