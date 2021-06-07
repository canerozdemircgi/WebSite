package com.canerozdemir.cgi.web;

import com.canerozdemir.cgi.web.answer.Journal;
import spark.Request;
import spark.Response;
import spark.Spark;

public final class Server
{
	public static void Init()
	{
		Spark.port(4567);

		Spark.options("/*", (Request request, Response response) ->
		{
			final String accessControlRequestHeaders = request.headers("Access-Control-Request-Headers");
			if (null != accessControlRequestHeaders)
				response.header("Access-Control-Allow-Headers", accessControlRequestHeaders);
			final String accessControlRequestMethod = request.headers("Access-Control-Request-Method");
			if (null != accessControlRequestMethod)
				response.header("Access-Control-Allow-Methods", accessControlRequestMethod);
			return "OK";
		});

		Spark.before((Request request, Response response) -> response.header("Access-Control-Allow-Origin", "*"));

		Spark.path("/Java", () -> Spark.post("/Journal", (Request request, Response response) -> Journal.Return(request)));

		// Spark.after((Request request, Response response) -> response.header("Content-Encoding", "gzip" });
	}
}