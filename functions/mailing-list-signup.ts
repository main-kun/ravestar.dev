interface Env {
  BUTTONDOWN_API_KEY: string;
}

interface RequestBody {
  email_address: string;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  try {
    // Parse the request body
    const body = await context.request.json() as RequestBody;

    if (!body.email_address) {
      return new Response(
        JSON.stringify({ error: "Email address is required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email_address)) {
      return new Response(
        JSON.stringify({ error: "Invalid email address" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const url = "https://api.buttondown.com/v1/subscribers";
    const options = {
      method: "POST",
      headers: {
        "Authorization": `Token ${context.env.BUTTONDOWN_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email_address: body.email_address,
      }),
    };

    const response = await fetch(url, options);
    const data = await response.json();

    console.log("Buttondown response:", response.status, JSON.stringify(data));

    if (!response.ok) {
      console.error("Buttondown error:", response.status, JSON.stringify(data));
      return new Response(
        JSON.stringify({ error: "Failed to subscribe", details: data }),
        { status: response.status, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ success: true, data }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Mailing list signup error:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
