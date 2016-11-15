module Jekyll
  module MatchFilter
    def match(input, exp)
      exp = Regexp.new(exp)
      input =~ exp
    end
  end
end

Liquid::Template.register_filter(Jekyll::MatchFilter)
