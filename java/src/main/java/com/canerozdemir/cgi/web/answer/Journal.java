package com.canerozdemir.cgi.web.answer;

import com.canerozdemir.cgi.data.Database;
import com.canerozdemir.cgi.data.DateTime;
import com.canerozdemir.cgi.data.Log;
import com.jsoniter.JsonIterator;
import com.jsoniter.output.JsonStream;
import com.mashape.unirest.http.Unirest;
import com.mashape.unirest.http.exceptions.UnirestException;
import spark.Request;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public final class Journal
{
	static class Dto
	{
		String href;
		String ip;
	}

	public static String Return(final Request request)
	{
		final String now = DateTime.DateTimeNow();
		final Dto dto = JsonIterator.deserialize(request.body(), Dto.class);
		final String ip = null == dto.ip || dto.ip.isEmpty() ? request.ip() : dto.ip;

		try
		(
			final Connection connection = Database.basicDataSource.getConnection();
			final PreparedStatement preparedStatement_insert = connection.prepareStatement("SELECT canerozdemircgi_journal_insert(?::timestamp with time zone, ?::text, ?::text, ?::text)")
		)
		{
			preparedStatement_insert.setString(1, now);
			preparedStatement_insert.setString(2, ip);
			preparedStatement_insert.setString(3, dto.href);
			preparedStatement_insert.setString(4, request.userAgent());

			try (final ResultSet resultSet = preparedStatement_insert.executeQuery())
			{
				connection.commit();

				resultSet.next();
				final int id = resultSet.getInt(1);

				try
				{
					final String ipLocation = Unirest.get("https://json.geoiplookup.io/" + ip).asString().getBody();

					try (final PreparedStatement preparedStatement_update = connection.prepareStatement("SELECT canerozdemircgi_journal_update_location(?::int, ?::text)"))
					{
						preparedStatement_update.setInt(1, id);
						preparedStatement_update.setString(2, ipLocation);
						preparedStatement_update.execute();

						connection.commit();
					}
				}
				catch (final UnirestException ex)
				{
					Log.logger.error(ex);
				}
			}
		}
		catch (final SQLException ex)
		{
			Log.logger.error(ex);

			return JsonStream.serialize(1);
		}

		return JsonStream.serialize(0);
	}
}