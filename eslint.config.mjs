import eslint from "@eslint/js";
import tseslint from "typescript-eslint";

export default tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.strict,
  tseslint.configs.stylistic,
  {
    rules: {
      "@typescript-eslint/member-ordering": [
        "error",
        {
          default: [
            // Static fields
            "public-static-field",
            "protected-static-field",
            "private-static-field",

            // Instance fields
            "public-instance-field",
            "protected-instance-field",
            "private-instance-field",

            // Constructors
            "public-constructor",
            "protected-constructor",
            "private-constructor",

            // Instance methods
            "public-instance-method",
            "protected-instance-method",
            "private-instance-method",
          ],
        },
      ],
    },
  }
);
