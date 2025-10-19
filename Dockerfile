FROM jekyll/jekyll:4.2.2

WORKDIR /srv/jekyll

# Copy Gemfile
COPY Gemfile* ./

# Install dependencies
RUN bundle install

# Expose port
EXPOSE 4000

# Start Jekyll server
CMD ["bundle", "exec", "jekyll", "serve", "--host", "0.0.0.0", "--livereload", "--drafts", "--future"]
